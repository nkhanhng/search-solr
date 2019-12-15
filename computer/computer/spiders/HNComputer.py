# -*- coding: utf-8 -*-
import scrapy
from ..items import PostItem
import re

class HncomputerSpider(scrapy.Spider):
    name = 'HNComputer'
    page_number = 2
    start_urls = [
        'https://spiderum.com/s/quan-diem-tranh-luan/hot?page=1'
    ]

    def parse(self, response):
        items = PostItem()

        posts = response.css(".feed-list .feed-post")
        posts2 = posts[1:]
        # print(posts[1])
        for post in posts2:
            title = post.css(".title a::text").extract()
            author = post.css(".author .username::text").extract()[0]
            link = "https://spiderum.com" + post.css(".title a::attr(href)").extract()[0]
            content = post.css(".body::text").extract()[0]
            image = post.css(".thumb img::attr(src)").extract()
            # print(content)

            items['post_title'] = title
            items['post_author'] = re.sub('^\s+|\s+$|\s+(?=\s)', '', author)
            items['post_content'] = content
            items['url_link'] = link
            if not image:
                items['post_imagelink'] = "null"
            else:
                items['post_imagelink'] = image[0]

            yield items
        #
        next_page = 'https://spiderum.com/s/quan-diem-tranh-luan/hot?page=' \
                    + str(HncomputerSpider.page_number)
        if HncomputerSpider.page_number <= 100:
            HncomputerSpider.page_number += 1
            yield response.follow(next_page, callback=self.parse)
