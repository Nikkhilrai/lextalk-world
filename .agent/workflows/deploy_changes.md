---
description: How to save changes and deploy them to the live website
---

# How to Deploy Changes

Since your project is connected to **GitHub** and **Vercel**, deployment is automatic! You just need to "Save" (Commit) your changes and "Push" them to the cloud.

### 1. Make your changes
Edit your code files as usual.

### 2. Open the Terminal
In your editor (VS Code), open the terminal (Ctrl+` or View > Terminal).

### 3. Run these 3 commands:
Copy and run these commands one by one:

```bash
# 1. Stage all your changes
git add .

# 2. Save them with a message (describe what you did)
git commit -m "Update homepage text" 

# 3. Send them to GitHub
git push
```

### 4. Done!
- **GitHub** receives your code.
- **Vercel** sees the new code and **automatically starts building**.
- In 1-2 minutes, your live website (`lextalk-world.vercel.app`) will update.

### Tips
- You can check the status of your deployment at [vercel.com/dashboard](https://vercel.com/dashboard).
- Always check that your code runs locally (`npm run dev`) before pushing!
