# Java 17 Containerized Compiler Integration (Professional Implementation Guide)

This document provides a production‑grade, step‑by‑step integration plan for executing Java programs inside isolated Docker containers. It is tailored to the verified Java 17 distribution located at:

- `C:\Users\ASUS\OneDrive\Desktop\CodeMaster-master\jdk-17.0.12`

Verified binaries and directories include:

- `jdk-17.0.12\bin\javac.exe`
- `jdk-17.0.12\bin\java.exe`
- `jdk-17.0.12\conf\`
- `jdk-17.0.12\jmods\`
- `jdk-17.0.12\legal\`

Every section below is numbered and contains explicit file paths, commands, and expected outputs.

---

## 1. Readiness checklist (system and tooling)

1. Install Docker Desktop for Windows.
   - Download: https://www.docker.com/products/docker-desktop/
   - Expected output: Docker Desktop is running (tray icon visible).
2. Enable WSL 2 backend.
   ```powershell
   wsl --install
   wsl --set-default-version 2
   ```
3. Validate Docker availability:
   ```powershell
   docker version
   ```
   - Expected output: Client/Server version details.
4. Validate JDK 17 binaries:
   ```powershell
   dir C:\Users\ASUS\OneDrive\Desktop\CodeMaster-master\jdk-17.0.12\bin\javac.exe
   dir C:\Users\ASUS\OneDrive\Desktop\CodeMaster-master\jdk-17.0.12\bin\java.exe
   ```
   - Expected output: both files are listed.
5. Prepare backend dependencies:
   ```powershell
   cd C:\Users\ASUS\OneDrive\Desktop\CodeMaster-master\backend
   py -3.10 -m pip install -r requirements-windows.txt
   ```

---

## 2. Build a Java 17 execution image (local JDK)

1. Create build context:
   - `C:\Users\ASUS\OneDrive\Desktop\CodeMaster-master\backend\docker\java17`
2. Copy the JDK into the context:
   ```powershell
   xcopy /E /I /Y C:\Users\ASUS\OneDrive\Desktop\CodeMaster-master\jdk-17.0.12 C:\Users\ASUS\OneDrive\Desktop\CodeMaster-master\backend\docker\java17\jdk-17.0.12
   ```
3. Create Dockerfile at:
   - `C:\Users\ASUS\OneDrive\Desktop\CodeMaster-master\backend\docker\java17\Dockerfile`
4. Dockerfile content:
   ```dockerfile
   FROM debian:bookworm-slim

   WORKDIR /app

   COPY jdk-17.0.12 /opt/jdk-17.0.12
   ENV JAVA_HOME=/opt/jdk-17.0.12
   ENV PATH="/opt/jdk-17.0.12/bin:${PATH}"

   RUN apt-get update && apt-get install -y --no-install-recommends \
       ca-certificates \
       && rm -rf /var/lib/apt/lists/*

   RUN useradd -m -u 10001 runner
   USER runner

   CMD ["bash"]
   ```
5. Build the image:
   ```powershell
   cd C:\Users\ASUS\OneDrive\Desktop\CodeMaster-master\backend\docker\java17
   docker build -t codemaster-java17:local .
   ```
6. Expected output:
   - `Successfully built <image_id>`
   - `Successfully tagged codemaster-java17:local`

---

## 3. Integration topology (frontend → backend → container)

1. The frontend compiler page submits Java source via HTTP.
2. The backend validates input and creates a short‑lived job workspace.
3. The backend launches a Docker container using `codemaster-java17:local`.
4. The job workspace is mounted into the container at `/app/workspace`.
5. The container runs:
   - `/opt/jdk-17.0.12/bin/javac Main.java`
   - `/opt/jdk-17.0.12/bin/java Main`
6. The backend collects stdout/stderr and returns a structured response.

---

## 4. Implementation steps (end‑to‑end)

### 4.1 Workspace preparation

1. Create a runtime root folder:
   ```powershell
   mkdir C:\Users\ASUS\OneDrive\Desktop\CodeMaster-master\backend\runtime
   ```
2. For each request, generate a unique job folder:
   - Example: `C:\Users\ASUS\OneDrive\Desktop\CodeMaster-master\backend\runtime\job-20260211-001`
3. Save user code into:
   - `...\job-20260211-001\Main.java`

### 4.2 Container execution command

1. Execute the container with hard limits:
   ```powershell
   docker run --rm ^
     --memory=256m ^
     --cpus=0.5 ^
     --network=none ^
     -v C:\Users\ASUS\OneDrive\Desktop\CodeMaster-master\backend\runtime\job-20260211-001:/app/workspace ^
     codemaster-java17:local ^
     bash -lc "cd /app/workspace && /opt/jdk-17.0.12/bin/javac Main.java && /opt/jdk-17.0.12/bin/java Main"
   ```
2. Expected output:
   - Program output in stdout.

### 4.3 API endpoints (backend)

1. Create endpoint:
   - `POST /api/compiler/run`
2. Request body:
   ```json
   {
     "language": "java",
     "code": "public class Main { public static void main(String[] args) { System.out.println(\"Hi\"); } }"
   }
   ```
3. Success response:
   ```json
   {
     "success": true,
     "output": "Hi\n",
     "errors": [],
     "execution_time": 0.095
   }
   ```
4. Error response:
   ```json
   {
     "success": false,
     "output": "",
     "errors": [
       { "line": 3, "message": "cannot find symbol" }
     ]
   }
   ```

### 4.4 Isolation controls

1. Disable networking: `--network=none`
2. Enforce memory and CPU caps: `--memory`, `--cpus`
3. Run as non‑root user: `USER runner`
4. Enforce timeouts at the backend level (e.g., 5 seconds).

### 4.5 Lifecycle management

1. Use `--rm` to auto‑remove containers.
2. Terminate containers on timeout.
3. Remove job workspace after execution.

---

## 5. Protocol specification (frontend ↔ backend)

1. Method: `POST`
2. Path: `/api/compiler/run`
3. Headers:
   - `Content-Type: application/json`
   - `Authorization: Bearer <token>` (if required)
4. Payload:
   ```json
   {
     "language": "java",
     "code": "<source code>"
   }
   ```
5. Response:
   - `success`: boolean
   - `output`: string
   - `errors`: array of `{ line, message }`
   - `execution_time`: number (seconds)

---

## 6. Error handling and logging

1. Capture stderr for compiler errors.
2. Parse `javac` output into line‑based errors.
3. Return structured JSON errors to the frontend.
4. Log execution details:
   - `C:\Users\ASUS\OneDrive\Desktop\CodeMaster-master\backend\logs\compiler.log`
5. Log example:
   ```
   [2026-02-11 10:32:12] job-20260211-001 ERROR javac failed: <message>
   ```

---

## 7. Test plan (isolation + correctness)

1. Successful execution:
   - Expected: `success: true`, output visible.
2. Compilation error:
   - Expected: `success: false` with parsed line errors.
3. Infinite loop:
   - Expected: timeout enforced, container terminated.
4. File access attempt:
   - Expected: failure or restricted access.
5. Network access attempt:
   - Expected: failure due to `--network=none`.

---

## 8. Performance tuning

1. Reuse the prebuilt Docker image.
2. Keep JDK unchanged to leverage layer caching.
3. Limit response payload size for large outputs.
4. Batch multiple requests through a queue if needed.

---

## 9. Security best practices

1. No privileged containers.
2. Disable network access.
3. Enforce strict CPU/memory/time limits.
4. Validate input size and reject oversized programs.
5. Remove all workspaces and containers after execution.

---

## 10. Troubleshooting matrix

1. **Docker not running**
   - Run: `docker version`
   - Start Docker Desktop.
2. **Image missing**
   - Rebuild:
     ```powershell
     docker build -t codemaster-java17:local C:\Users\ASUS\OneDrive\Desktop\CodeMaster-master\backend\docker\java17
     ```
3. **Mount errors**
   - Grant Docker access to `C:\Users\ASUS\OneDrive\Desktop\CodeMaster-master`.
4. **javac not found**
   - Confirm Dockerfile path `/opt/jdk-17.0.12/bin/javac`.
5. **No output**
   - Ensure `javac` succeeds before `java Main`.
