Write-Output "Pushing root monorepo..."
cd C:\Users\brade\IdeaProjects\SeniorCapstoneSetlistAggregator
git add .
git commit -m "Main Project monorepo: update all components front and backend"
git push

Write-Output "Pushing frontend repo..."
cd frontend
git add .
git commit -m "Frontend deploy: sync from monorepo"
git push

Write-Output "Pushing backend repo..."
cd ../backend
git add .
git commit -m "Backend deploy: sync from monorepo"
git push

Write-Output "All 3 repos pushed successfully!"
