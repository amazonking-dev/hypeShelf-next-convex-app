# Development Guide

## Windows File Locking Issues

If you encounter `EBUSY: resource busy or locked` errors when running `npm run dev`, use the cleanup script:

### Quick Fix:
```powershell
npm run clean
npm run dev
```

### Or use the combined command:
```powershell
npm run dev:clean
```

### Manual Cleanup:
If the script doesn't work, manually:
1. Stop all Node processes (Ctrl+C in all terminals)
2. Run: `.\clean-next.ps1`
3. Or manually delete `.next` folder
4. Restart: `npm run dev`

## Available Scripts

- `npm run dev` - Start development server
- `npm run dev:clean` - Clean .next and start dev server
- `npm run clean` - Clean .next directory (stops Node processes first)
- `npm run clean:force` - Force cleanup (alternative method)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Troubleshooting

### Convex Functions Not Found
Make sure to run `npx convex dev` in a separate terminal window and keep it running.

### File Locking Issues
1. Close all terminals running Node.js
2. Run `npm run clean`
3. Wait a few seconds
4. Run `npm run dev`

### Port Already in Use
If port 3000 is busy:
```powershell
# Find and kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```
