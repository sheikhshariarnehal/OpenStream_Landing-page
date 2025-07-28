-- Supabase Database Schema for Access Code Management System
-- Compatible with all Supabase plans (Free, Pro, Team, Enterprise)
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create access_codes table
CREATE TABLE IF NOT EXISTS access_codes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code VARCHAR(8) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    used_at TIMESTAMP WITH TIME ZONE,
    used_by VARCHAR(255),
    duration_minutes INTEGER NOT NULL DEFAULT 10,
    created_by VARCHAR(255) DEFAULT 'admin'
);

-- Create usage_logs table
CREATE TABLE IF NOT EXISTS usage_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code VARCHAR(8) NOT NULL,
    action VARCHAR(20) NOT NULL CHECK (action IN ('generated', 'used', 'expired', 'revoked')),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    details TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_access_codes_code ON access_codes(code);
CREATE INDEX IF NOT EXISTS idx_access_codes_active ON access_codes(is_active);
CREATE INDEX IF NOT EXISTS idx_access_codes_expires_at ON access_codes(expires_at);
CREATE INDEX IF NOT EXISTS idx_access_codes_created_at ON access_codes(created_at);

CREATE INDEX IF NOT EXISTS idx_usage_logs_code ON usage_logs(code);
CREATE INDEX IF NOT EXISTS idx_usage_logs_action ON usage_logs(action);
CREATE INDEX IF NOT EXISTS idx_usage_logs_timestamp ON usage_logs(timestamp);

-- Create Row Level Security (RLS) policies
ALTER TABLE access_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;

-- Policy for access_codes: Allow all operations (you can restrict this based on your needs)
CREATE POLICY "Allow all operations on access_codes" ON access_codes
    FOR ALL USING (true);

-- Policy for usage_logs: Allow all operations
CREATE POLICY "Allow all operations on usage_logs" ON usage_logs
    FOR ALL USING (true);

-- Create a function to automatically cleanup expired codes
CREATE OR REPLACE FUNCTION cleanup_expired_codes()
RETURNS INTEGER AS $$
DECLARE
    expired_count INTEGER;
BEGIN
    -- Count expired codes that are still active
    SELECT COUNT(*) INTO expired_count
    FROM access_codes
    WHERE is_active = TRUE AND expires_at < NOW();
    
    -- Deactivate expired codes
    UPDATE access_codes
    SET is_active = FALSE
    WHERE is_active = TRUE AND expires_at < NOW();
    
    -- Log the cleanup action for each expired code
    INSERT INTO usage_logs (code, action, details)
    SELECT code, 'expired', 'Automatically expired by cleanup function'
    FROM access_codes
    WHERE is_active = FALSE AND expires_at < NOW()
    AND NOT EXISTS (
        SELECT 1 FROM usage_logs ul 
        WHERE ul.code = access_codes.code 
        AND ul.action = 'expired' 
        AND ul.timestamp > NOW() - INTERVAL '1 minute'
    );
    
    RETURN expired_count;
END;
$$ LANGUAGE plpgsql;

-- Create a function to get dashboard statistics
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'active_codes', (
            SELECT COUNT(*) FROM access_codes 
            WHERE is_active = TRUE AND expires_at > NOW()
        ),
        'total_codes', (
            SELECT COUNT(*) FROM access_codes
        ),
        'used_codes', (
            SELECT COUNT(*) FROM access_codes 
            WHERE used_at IS NOT NULL
        ),
        'expired_codes', (
            SELECT COUNT(*) FROM access_codes 
            WHERE expires_at < NOW()
        ),
        'codes_generated_today', (
            SELECT COUNT(*) FROM access_codes 
            WHERE created_at >= CURRENT_DATE
        ),
        'codes_used_today', (
            SELECT COUNT(*) FROM access_codes 
            WHERE used_at >= CURRENT_DATE
        ),
        'expiring_soon', (
            SELECT COUNT(*) FROM access_codes 
            WHERE is_active = TRUE 
            AND expires_at > NOW() 
            AND expires_at < NOW() + INTERVAL '5 minutes'
        ),
        'recent_activity_count', (
            SELECT COUNT(*) FROM usage_logs 
            WHERE timestamp >= NOW() - INTERVAL '24 hours'
        )
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Create a view for active codes with time remaining
CREATE OR REPLACE VIEW active_codes_with_time_remaining AS
SELECT 
    *,
    CASE 
        WHEN expires_at > NOW() THEN 
            EXTRACT(EPOCH FROM (expires_at - NOW()))::INTEGER
        ELSE 0 
    END as seconds_remaining,
    CASE 
        WHEN expires_at > NOW() THEN 
            EXTRACT(EPOCH FROM (expires_at - NOW()))/60::INTEGER
        ELSE 0 
    END as minutes_remaining
FROM access_codes 
WHERE is_active = TRUE
ORDER BY created_at DESC;

-- Create a view for recent activity
CREATE OR REPLACE VIEW recent_activity AS
SELECT 
    ul.*,
    ac.expires_at,
    ac.duration_minutes,
    ac.used_at as code_used_at
FROM usage_logs ul
LEFT JOIN access_codes ac ON ul.code = ac.code
ORDER BY ul.timestamp DESC;

-- Grant necessary permissions (adjust based on your security requirements)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON access_codes TO anon, authenticated;
GRANT ALL ON usage_logs TO anon, authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Insert some sample data for testing (optional - uncomment if needed)
/*
INSERT INTO access_codes (code, expires_at, duration_minutes) VALUES
('DEMO1234', NOW() + INTERVAL '10 minutes', 10),
('TEST5678', NOW() + INTERVAL '30 minutes', 30),
('SAMPLE99', NOW() + INTERVAL '1 hour', 60);

INSERT INTO usage_logs (code, action, details) VALUES
('DEMO1234', 'generated', 'Generated for testing'),
('TEST5678', 'generated', 'Generated for testing'),
('SAMPLE99', 'generated', 'Generated for testing');
*/

-- Test the setup by running these queries:
-- SELECT * FROM access_codes;
-- SELECT * FROM usage_logs;
-- SELECT get_dashboard_stats();
-- SELECT cleanup_expired_codes();
