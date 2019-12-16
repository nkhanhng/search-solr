# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class PostItem(scrapy.Item):
    # define the fields for your item here like:
    post_title = scrapy.Field()
    post_author = scrapy.Field()
    post_content = scrapy.Field()
    post_overview = scrapy.Field()
    post_imagelink = scrapy.Field()
    url_link = scrapy.Field()
    pass