# -*- coding: utf-8 -*-
import scrapy
from ..items import PostItem
import re


def get_data(res):
    title = res.meta.get('title')[0]
    link = res.url
    image = res.css(".fr-dib::attr(src)").extract()
    author = res.css(".author .username a::text").extract()[0]
    content = res.css("#post-content-view-edit div+ div::text").extract()
    overview = content[0]
    items = PostItem()
    items['post_title'] = title
    items['post_author'] = re.sub('^\s+|\s+$|\s+(?=\s)', '', author)
    items['post_content'] = "".join(content)
    items['post_overview'] = overview
    items['url_link'] = link
    if not image:
        items['post_imagelink'] = "default"
    else:
        items['post_imagelink'] = image[0]

    yield items


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
            # print(title)
            link = "https://spiderum.com" + post.css(".title a::attr(href)").extract()[0]
            # print(link)
            if link:
                req = scrapy.Request(url=link, callback=get_data)
                req.meta['title'] = title
                yield req

        next_page = 'https://spiderum.com/s/quan-diem-tranh-luan/hot?page=' \
                    + str(HncomputerSpider.page_number)
        if HncomputerSpider.page_number <= 100:
            HncomputerSpider.page_number += 1
            yield response.follow(next_page, callback=self.parse)
