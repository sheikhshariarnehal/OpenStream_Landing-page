# Troubleshooting Guide

## 🐛 **Issue: Code Generation Not Working**

Based on your screenshot showing "G1L45XBJ" was generated but copy functionality might not be working, here are the steps to diagnose and fix the issue:

### **Step 1: Quick Debug Test**

1. **Navigate to the debug page**: `http://localhost:3000/debug`
2. **Click "Test API"** to verify the backend is working
3. **Click "Test Copy Function"** to verify clipboard access
4. **Check the results** to see what's failing

### **Step 2: Check Browser Console**

1. **Open Developer Tools** (F12 or right-click → Inspect)
2. **Go to Console tab**
3. **Look for any red error messages**
4. **Try generating a code and see if errors appear**

Common console errors:
```
- "Failed to execute 'writeText' on 'Clipboard'" → Clipboard permission issue
- "TypeError: Cannot read property..." → Component state issue
- "Network error" → API connection issue
```

### **Step 3: Check Network Tab**

1. **Open Developer Tools** (F12)
2. **Go to Network tab**
3. **Try generating a code**
4. **Look for API calls to `/api/access-codes`**
5. **Check if they return 200 status or errors**

### **Step 4: Browser Compatibility Issues**

#### **Clipboard API Issues**
The clipboard API requires HTTPS or localhost. If you're accessing via IP address, it might fail.

**Solutions:**
- Access via `http://localhost:3000` instead of `http://192.168.x.x:3000`
- Use the fallback copy method (already implemented)
- Grant clipboard permissions in browser settings

#### **Browser Permissions**
Some browsers block clipboard access by default.

**Chrome/Edge:**
1. Click the lock icon in address bar
2. Allow clipboard access
3. Refresh the page

**Firefox:**
1. Type `about:config` in address bar
2. Search for `dom.events.asyncClipboard.clipboardItem`
3. Set to `true`

### **Step 5: Component State Issues**

If the code is generated but not showing in the "Recently Generated" section:

1. **Check if `lastGenerated` state is being updated**
2. **Verify the API response format**
3. **Check if the component is re-rendering**

### **Step 6: API Response Format**

The API should return:
```json
{
  "code": "G1L45XBJ",
  "expiresAt": "2024-01-15T14:40:00.000Z",
  "expirationMinutes": 10
}
```

If the format is different, the code extraction might fail.

### **Step 7: Manual Testing**

Try this in the browser console:
```javascript
// Test clipboard directly
navigator.clipboard.writeText("TEST123").then(() => {
  console.log("Clipboard works!");
}).catch(err => {
  console.error("Clipboard failed:", err);
});

// Test API directly
fetch('/api/access-codes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer admin-secret-token-2024'
  },
  body: JSON.stringify({
    action: 'generate',
    duration: 10
  })
}).then(r => r.json()).then(console.log);
```

## 🔧 **Common Fixes**

### **Fix 1: Clipboard Permission**
Add this to your page if clipboard doesn't work:
```javascript
// Request clipboard permission
navigator.permissions.query({name: "clipboard-write"}).then(result => {
  console.log("Clipboard permission:", result.state);
});
```

### **Fix 2: Force HTTPS (if needed)**
If you need HTTPS for clipboard to work:
```bash
# Install mkcert for local HTTPS
npm install -g mkcert
mkcert -install
mkcert localhost

# Then run Next.js with HTTPS
npm run dev -- --experimental-https
```

### **Fix 3: Fallback Copy Method**
The code already includes a fallback, but you can test it manually:
```javascript
function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  const success = document.execCommand('copy');
  document.body.removeChild(textArea);
  return success;
}
```

### **Fix 4: Component Re-render Issue**
If codes generate but don't show, add this debug log:
```javascript
// In code-generator.tsx, add to handleGenerate:
console.log('Setting lastGenerated:', newCodes);
setLastGenerated(newCodes);
console.log('State should update now');
```

## 🚨 **Emergency Workarounds**

### **Workaround 1: Manual Copy**
If copy button doesn't work, show the code in a text input:
```jsx
<input 
  value={code} 
  readOnly 
  onClick={(e) => e.target.select()} 
  className="font-mono bg-gray-700 text-white p-2 rounded"
/>
```

### **Workaround 2: Alert Dialog**
Show code in an alert for easy manual copying:
```javascript
const showCode = (code) => {
  alert(`Generated Code: ${code}\n\nClick OK and use Ctrl+C to copy this message.`);
};
```

### **Workaround 3: Download as File**
If clipboard fails, download codes as a text file:
```javascript
const downloadCodes = (codes) => {
  const blob = new Blob([codes.join('\n')], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'access-codes.txt';
  a.click();
  URL.revokeObjectURL(url);
};
```

## 📋 **Debugging Checklist**

- [ ] API endpoints are responding (check Network tab)
- [ ] Console shows no JavaScript errors
- [ ] Clipboard permissions are granted
- [ ] Accessing via localhost (not IP address)
- [ ] Browser supports modern JavaScript features
- [ ] Toast notifications are working
- [ ] Component state is updating correctly
- [ ] API returns expected JSON format

## 🆘 **If Nothing Works**

1. **Use the debug page**: `/debug` to isolate the issue
2. **Check browser compatibility**: Try Chrome/Edge latest version
3. **Restart the development server**: `npm run dev`
4. **Clear browser cache**: Hard refresh (Ctrl+Shift+R)
5. **Try incognito mode**: Rules out extension conflicts

## 📞 **Getting Help**

When reporting issues, please include:
1. **Browser and version**
2. **Console error messages**
3. **Network tab screenshots**
4. **Steps to reproduce**
5. **Debug page test results**

The debug page at `/debug` will help identify exactly what's failing and provide detailed error information.
