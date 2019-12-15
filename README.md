# fuckfuckgo

##Requirements

- Nodejs : install nvm 
  + curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash
  
  + nvm install 10.17.0
  + nvm use 10.17.0
  
- Solr 8.2.0
- Scrapy : install scrapy
  + Python3: pip install Scrapy
 
##Usage

###run server nodejs 
  npm start
  
###run scrapy:
 checkout branch to "scrapy" <br/>
 run command "scrapy crawl HNComputer -o filename.json <br/>

###Index data to solr server by following these command:
  bin/solr create -c yourcorename
  bin/solr post -c yourcorename path/to/filename.json
  
