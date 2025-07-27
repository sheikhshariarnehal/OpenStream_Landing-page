# Supabase Database Integration Guide

## 🚀 **Overview**

This guide will help you set up Supabase database integration for the Access Code Management System, replacing the in-memory storage with a persistent, scalable database solution.

## 📋 **Prerequisites**

- Node.js 18+ installed
- A Supabase account (free tier available)
- Basic understanding of SQL and environment variables

## 🔧 **Step 1: Create Supabase Project**

1. **Go to Supabase**: Visit [supabase.com](https://supabase.com)
2. **Sign up/Login**: Create account or sign in
3. **Create New Project**:
   - Click "New Project"
   - Choose organization
   - Enter project name: `access-code-management`
   - Enter database password (save this!)
   - Select region closest to your users
   - Click "Create new project"

4. **Wait for Setup**: Project creation takes 2-3 minutes

## 🔑 **Step 2: Get API Keys**

1. **Go to Project Settings**:
   - Click the gear icon (⚙️) in sidebar
   - Go to "API" section

2. **Copy Required Keys**:
   - **Project URL**: `https://your-project-ref.supabase.co`
   - **Anon Public Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **Service Role Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (optional)

## 📁 **Step 3: Install Dependencies**

```bash
# Install Supabase client
npm install @supabase/supabase-js

# Or if using yarn
yarn add @supabase/supabase-js

# Or if using pnpm
pnpm add @supabase/supabase-js
```

## 🔐 **Step 4: Configure Environment Variables**

1. **Create `.env.local` file** in your project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Admin Authentication
ADMIN_TOKEN=admin-secret-token-2024

# Optional: Service Role Key for admin operations
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

2. **Replace placeholders** with your actual Supabase keys

## 🗄️ **Step 5: Create Database Schema**

1. **Open Supabase Dashboard**:
   - Go to your project dashboard
   - Click "SQL Editor" in sidebar

2. **Run Schema Script**:
   - Copy the contents of `database/schema-fixed.sql` (use this instead of schema.sql)
   - Paste into SQL Editor
   - Click "Run" to execute

   **Note**: If you get a "schema cron does not exist" error, use `schema-fixed.sql` which is compatible with all Supabase plans.

3. **Verify Tables Created**:
   - Go to "Table Editor" in sidebar
   - You should see:
     - `access_codes` table
     - `usage_logs` table

## 🔒 **Step 6: Configure Row Level Security (RLS)**

The schema automatically sets up RLS policies, but you can customize them:

```sql
-- Example: Restrict access to authenticated users only
CREATE POLICY "Authenticated users only" ON access_codes
    FOR ALL USING (auth.role() = 'authenticated');

-- Example: Admin-only access
CREATE POLICY "Admin only" ON access_codes
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
```

## 🧪 **Step 7: Test Database Connection**

1. **Run the setup script**:
```bash
npx tsx scripts/setup-database.ts
```

2. **Expected output**:
```
🚀 Setting up database...
📡 Testing database connection...
✅ Database connected. Current total codes: 0
🧹 Cleaning up expired codes...
✅ Cleaned up 0 expired codes
📝 Generating sample access codes...
✅ Generated sample codes:
   - ABC123XY (expires: 1/15/2024, 2:40:00 PM)
   - DEF456ZW (expires: 1/15/2024, 3:00:00 PM)
   - GHI789UV (expires: 1/15/2024, 3:30:00 PM)
🎉 Database setup completed successfully!
```

## 🚀 **Step 8: Start the Application**

```bash
npm run dev
```

Navigate to `http://localhost:3000/admin` and test:
1. Login with admin token
2. Generate access codes
3. View real-time updates
4. Test code validation

## 🔄 **Step 9: Enable Real-time Features (Optional)**

1. **Go to Database Settings**:
   - In Supabase dashboard
   - Go to "Database" → "Replication"

2. **Enable Realtime**:
   - Toggle on "Enable Realtime"
   - Select tables: `access_codes`, `usage_logs`
   - Click "Save"

## 📊 **Step 10: Monitor Database**

1. **View Logs**:
   - Go to "Logs" in Supabase dashboard
   - Monitor API calls and errors

2. **Check Performance**:
   - Go to "Reports" for usage statistics
   - Monitor database performance

## 🛠️ **Advanced Configuration**

### **Custom Functions**

The schema includes helpful functions:

```sql
-- Get dashboard statistics
SELECT get_dashboard_stats();

-- Cleanup expired codes manually
SELECT cleanup_expired_codes();
```

### **Scheduled Jobs**

If your Supabase plan supports `pg_cron`:

```sql
-- Auto-cleanup every 5 minutes
SELECT cron.schedule(
    'cleanup-expired-codes',
    '*/5 * * * *',
    'SELECT cleanup_expired_codes();'
);
```

### **Backup Strategy**

1. **Automatic Backups**: Enabled by default in Supabase
2. **Manual Backup**:
   ```bash
   # Export data
   supabase db dump --data-only > backup.sql
   ```

## 🔧 **Troubleshooting**

### **Common Issues**

1. **"Missing Supabase environment variables"**
   - Check `.env.local` file exists
   - Verify variable names are correct
   - Restart development server

2. **"Failed to connect to database"**
   - Check Supabase project is running
   - Verify URL and keys are correct
   - Check network connectivity

3. **"Unauthorized" errors**
   - Verify RLS policies
   - Check API key permissions
   - Ensure admin token is correct

4. **Real-time not working**
   - Enable Realtime in Supabase dashboard
   - Check table replication settings
   - Verify WebSocket connection

### **Debug Steps**

1. **Test API directly**:
   ```bash
   curl -X GET "https://your-project.supabase.co/rest/v1/access_codes" \
     -H "apikey: your-anon-key" \
     -H "Authorization: Bearer your-anon-key"
   ```

2. **Check browser console** for JavaScript errors

3. **Monitor Supabase logs** in dashboard

4. **Use debug page**: `http://localhost:3000/debug`

## 📈 **Performance Optimization**

1. **Indexes**: Already created in schema for optimal performance
2. **Connection Pooling**: Handled automatically by Supabase
3. **Caching**: Consider implementing Redis for frequently accessed data
4. **Rate Limiting**: Implement in your API routes

## 🔐 **Security Best Practices**

1. **Environment Variables**: Never commit `.env.local` to version control
2. **RLS Policies**: Customize based on your security requirements
3. **API Keys**: Rotate keys regularly
4. **Admin Token**: Use strong, unique tokens in production
5. **HTTPS**: Always use HTTPS in production

## 🚀 **Production Deployment**

1. **Environment Variables**: Set in your hosting platform
2. **Database Scaling**: Upgrade Supabase plan if needed
3. **Monitoring**: Set up alerts for errors and performance
4. **Backups**: Verify backup strategy is working
5. **SSL**: Ensure SSL certificates are valid

## 📚 **Additional Resources**

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js with Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Real-time Subscriptions](https://supabase.com/docs/guides/realtime)

## 🎉 **Success!**

Your Access Code Management System is now powered by Supabase with:
- ✅ Persistent database storage
- ✅ Real-time updates
- ✅ Scalable architecture
- ✅ Professional-grade security
- ✅ Automatic backups
- ✅ Performance monitoring

The system will now handle thousands of access codes efficiently with real-time synchronization across all admin dashboard instances!
