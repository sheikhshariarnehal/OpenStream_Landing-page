# Fix for "schema cron does not exist" Error

## 🚨 **Problem**
You're getting this error when running the database schema:
```
ERROR: 3F000: schema "cron" does not exist
LINE 134: SELECT cron.schedule(
```

## ✅ **Solution**

The `pg_cron` extension is only available in Supabase Pro plans and above. The free tier doesn't support it.

### **Quick Fix:**

1. **Use the Fixed Schema**:
   - Use `database/schema-fixed.sql` instead of `database/schema.sql`
   - This version removes the cron job and is compatible with all Supabase plans

2. **Run the Fixed Schema**:
   ```sql
   -- Copy and paste the contents of database/schema-fixed.sql
   -- into your Supabase SQL Editor and run it
   ```

### **What Changed:**

❌ **Removed** (causes error on free tier):
```sql
SELECT cron.schedule(
    'cleanup-expired-codes',
    '*/5 * * * *',
    'SELECT cleanup_expired_codes();'
);
```

✅ **Added** (application-level cleanup):
- Automatic cleanup in API routes
- Manual cleanup endpoint: `/api/cleanup`
- Background cleanup service
- Cleanup before each operation

## 🔧 **How Cleanup Works Now**

### **1. Automatic Cleanup**
The application automatically cleans up expired codes:
- Before generating new codes
- Before fetching admin data
- Before validating codes

### **2. Manual Cleanup**
You can manually trigger cleanup:
```bash
# Call the cleanup API
curl -X POST "http://localhost:3000/api/cleanup" \
  -H "Authorization: Bearer admin-secret-token-2024"
```

### **3. Background Cleanup**
The app runs cleanup every 5 minutes automatically in the background.

## 📋 **Steps to Fix**

1. **Delete the old tables** (if you already ran the broken schema):
   ```sql
   DROP TABLE IF EXISTS usage_logs;
   DROP TABLE IF EXISTS access_codes;
   ```

2. **Run the fixed schema**:
   - Copy contents of `database/schema-fixed.sql`
   - Paste in Supabase SQL Editor
   - Click "Run"

3. **Verify it works**:
   ```sql
   -- Test queries
   SELECT * FROM access_codes;
   SELECT * FROM usage_logs;
   SELECT cleanup_expired_codes();
   ```

4. **Test the application**:
   ```bash
   npm run dev
   # Go to http://localhost:3000/admin
   # Generate some codes and verify everything works
   ```

## 🎯 **Alternative Solutions**

### **Option 1: Upgrade Supabase Plan**
- Upgrade to Supabase Pro ($25/month)
- Get access to `pg_cron` extension
- Use the original schema with scheduled jobs

### **Option 2: External Cron Jobs**
Set up external scheduled tasks:

**Vercel Cron Jobs** (if deploying to Vercel):
```javascript
// api/cron/cleanup.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Call your cleanup API
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/cleanup`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ADMIN_TOKEN}`
      }
    });
    
    res.json({ success: true });
  }
}
```

**GitHub Actions** (free option):
```yaml
# .github/workflows/cleanup.yml
name: Cleanup Expired Codes
on:
  schedule:
    - cron: '*/5 * * * *'  # Every 5 minutes
jobs:
  cleanup:
    runs-on: ubuntu-latest
    steps:
      - name: Cleanup
        run: |
          curl -X POST "${{ secrets.APP_URL }}/api/cleanup" \
            -H "Authorization: Bearer ${{ secrets.ADMIN_TOKEN }}"
```

**Netlify Functions**:
```javascript
// netlify/functions/cleanup.js
exports.handler = async (event, context) => {
  // Cleanup logic here
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
```

## ✅ **Verification**

After applying the fix, you should be able to:

1. ✅ Run the schema without errors
2. ✅ Generate access codes
3. ✅ See automatic cleanup working
4. ✅ Call manual cleanup via API
5. ✅ View real-time updates in admin dashboard

## 🆘 **Still Having Issues?**

If you're still getting errors:

1. **Check Supabase plan**: Confirm you're using the fixed schema
2. **Clear browser cache**: Hard refresh (Ctrl+Shift+R)
3. **Restart dev server**: `npm run dev`
4. **Check console logs**: Look for any JavaScript errors
5. **Test API directly**: Use the debug page at `/debug`

The fixed implementation provides the same functionality without requiring the `pg_cron` extension, making it compatible with all Supabase plans!
