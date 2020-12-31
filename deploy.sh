SITE_ID=0d6e6182-cc7b-4957-85f1-85dc47caecbb

cd react/my-app
yarn build
yarn netlify deploy --prod --dir=build --site="$SITE_ID"