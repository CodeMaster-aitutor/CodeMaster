Start-Process powershell -WorkingDirectory "c:\Users\ASUS\OneDrive\Desktop\CodeMaster-master\backend" -ArgumentList "-NoExit", "py -3.10 run.py"
Start-Sleep -Seconds 2
Start-Process powershell -WorkingDirectory "c:\Users\ASUS\OneDrive\Desktop\CodeMaster-master\frontend" -ArgumentList "-NoExit", "npm run dev"
