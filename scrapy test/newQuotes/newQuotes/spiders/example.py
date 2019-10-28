# -*- coding: utf-8 -*-
import scrapy
from ..items import NewquotesItem

class ExampleSpider(scrapy.Spider):
    name = 'quotes'
    allowed_domains = ['quotes.toscrape.com']
    start_urls = ['http://quotes.toscrape.com/']

    def parse(self, response):

        items = NewquotesItem()

        allDivQuotes = response.css('div.quote')

        for quote in allDivQuotes:
            title = quote.css('span.text::text').extract()
            author = quote.css('.author::text').extract()
            tag = quote.css('.tag::text').extract()

            items['title'] = title
            items['author'] = author
            items['tags'] = tag
            yield items

        
        next_page = response.css('li.next a::attr(href)').get()

        if next_page is not None:
            yield response.follow(next_page, callBack = self.parse)