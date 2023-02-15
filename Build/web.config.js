<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
            <staticContent>
                <remove fileExtension=".unityweb" />
                <mimeMap fileExtension=".unityweb" mimeType="application/octet-stream" />
                <mimeMap fileExtension=".framework.js.gz" mimeType="application/javascript" />
                <mimeMap fileExtension=".data.gz" mimeType="application/octet-stream" />
                <mimeMap fileExtension=".wasm.gz" mimeType="application/wasm" />
            </staticContent>
            <rewrite>
              <outboundRules rewriteBeforeCache="true">
                <rule name="Custom gzip file header">
                  <match serverVariable="RESPONSE_CONTENT_ENCODING" pattern=".*" />
                  <conditions>
                    <add input="{REQUEST_URI}" pattern="\.gz$" />
                  </conditions>
                  <action type="Rewrite" value="gzip"/>
                </rule>
              </outboundRules>
           
              <rules>
                <rule name="Rewrite gzip file">
                  <match url="(.*)"/>
                  <conditions>
                    <add input="{HTTP_ACCEPT_ENCODING}" pattern="gzip" />
                    <add input="{REQUEST_FILENAME}.gz" matchType="IsFile" />
                  </conditions>
                  <action type="Rewrite" url="{R:1}.gz" />
                </rule>
              </rules>
            </rewrite>
    </system.webServer>
</configuration>
