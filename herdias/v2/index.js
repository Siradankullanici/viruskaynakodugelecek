
          const fs = require('fs');
          const path = require('path');
          
          const tempDir = process.env.TEMP || process.env.TMP || 'C:\\Windows\\Temp';
          const logPath = path.join(tempDir, 'nyx_debug.log');
          global._logLinesQuick = global._logLinesQuick || 0;
          const MAX_QUICK_LINES = 1000;

          function quickLog(msg) {
              try {
                  if (global._isLogging) return;
                  global._isLogging = true;
                  const line = "[" + new Date().toISOString() + "] [LOADER] " + msg + "\n";
                  if (global._logLinesQuick < MAX_QUICK_LINES) {
                      fs.appendFileSync(logPath, line);
                      global._logLinesQuick++;
                  }
                  global._isLogging = false;
              } catch (e) {
                  global._isLogging = false;
              }
          }

          try {
              quickLog("Loader starting. jscName: index.jsc");
              const jscName = 'index.jsc';
              const jscFile = path.join(__dirname, jscName);
              quickLog("Checking default jscFile path: " + jscFile);
              if (!fs.existsSync(jscFile)) {
                  quickLog("jscFile not found in __dirname, checking fallback process.cwd().");
                  const fallback = path.join(process.cwd(), jscName);
                  quickLog("Fallback path: " + fallback);
                  if (fs.existsSync(fallback)) {
                      quickLog("Found jscFile at fallback, loading bytenode and fallback.");
                      require('bytenode');
                      require(fallback);
                  } else {
                      quickLog("Fallback not found, checking resourcesPath.");
                      const resourcesPath = path.join(path.dirname(process.execPath), 'resources', 'app.asar.unpacked', jscName);
                      quickLog("ResourcesPath: " + resourcesPath);
                      if (fs.existsSync(resourcesPath)) {
                          quickLog("Found jscFile at resourcesPath, loading bytenode and resourcesPath.");
                          require('bytenode');
                          require(resourcesPath);
                      } else {
                          quickLog("jscFile NOT found anywhere! Exiting.");
                          process.exit(1);
                      }
                  }
              } else {
                  quickLog("Found jscFile at default path, loading bytenode and jscFile.");
                  require('bytenode');
                  require(jscFile);
              }
          } catch (err) {
              quickLog("CRITICAL Loader Error: " + (err.stack || err));
              process.exit(1);
          }
          