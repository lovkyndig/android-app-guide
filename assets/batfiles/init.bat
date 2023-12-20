clear
@cls
@echo THIS BAT-FILE WILL INIT THE PROJECT
@echo ---
@echo It will copy the necessary folders and files from;
@echo - the installed dependencie @lovkyndig/android-app-guide-
@echo ---
@echo Open the batfile to see the details.
@echo ---
@pause
@echo off
:: Folders from assets and content - includes images in articles.
xcopy /s /i "node_modules/@lovkyndig/android-app-guide/assets/batfiles" "assets/batfiles"
xcopy /s /i "node_modules/@lovkyndig/android-app-guide/assets/guide" "assets/guide"
xcopy /s /i "node_modules/@lovkyndig/android-app-guide/content/1.article" "content/1.article"
xcopy /s /i "node_modules/@lovkyndig/android-app-guide/public/article" "public/article"
:: From public
copy node_modules\@lovkyndig\android-app-guide\public\robots.txt public\
copy node_modules\@lovkyndig\android-app-guide\public\webp.bat public\
:: Create convert-folder and subfolders
md public\convert\original-format
md public\convert\webp
:: Serivice-worker-files for developer-mode
copy node_modules\@lovkyndig\android-app-guide\public\sw.js public\
copy node_modules\@lovkyndig\android-app-guide\public\sw.js.map public\
copy node_modules\@lovkyndig\android-app-guide\public\workbox-ad213f2f.js public\
copy node_modules\@lovkyndig\android-app-guide\public\workbox-ad213f2f.js.map public\
:: Root-files
copy node_modules\@lovkyndig\android-app-guide\public\rss-sitemap.bat rss-sitemap.bat
copy node_modules\@lovkyndig\android-app-guide\public\create-app.bat create-app.bat
copy node_modules\@lovkyndig\android-app-guide\public\.env-example .env-example
copy node_modules\@lovkyndig\android-app-guide\public\.npmrc .npmrc