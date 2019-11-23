# -*- coding: utf-8 -*-
import scrapy
from ..items import ComputerItem


def get_data(res):
    title = res.meta.get('title')
    image = res.css("#img_large img::attr(src)").extract()
    price = res.css(".text-24::text").extract()
    description = res.css("#js-tskt-item li::text").extract()
    items = ComputerItem()
    items['product_name'] = title
    items['product_description'] = description
    items['product_price'] = price
    items['product_imagelink'] = image
    yield items


class HncomputerSpider(scrapy.Spider):
    name = 'HNComputer'
    page_number = 2
    start_urls = [
        'https://www.hanoicomputer.vn/laptop-may-tinh-xach-tay/c159.html?page=1'
    ]

    def parse(self, response):
        laptops = response.css(".p-component.item")
        # print(laptops[0])
        for laptop in laptops:
            title = laptop.css(".p-info a::text").extract()
            link = "https://www.hanoicomputer.vn" + laptop.css(".p-img a::attr(href)").extract()[0]
            if link:
                req = scrapy.Request(url=link, callback=get_data)
                req.meta['title'] = title
                yield req

        next_page = 'https://www.hanoicomputer.vn/laptop-may-tinh-xach-tay/c159.html?page=' \
                    + str(HncomputerSpider.page_number)
        if HncomputerSpider.page_number <= 15:
            HncomputerSpider.page_number += 1
            yield response.follow(next_page, callback=self.parse)
