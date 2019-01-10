###########################################
# Let's Have Some Fun
# File Name: generate_data.py
# Author: Weilin Liu
# Mail: liuweilin17@qq.com
# Created Time: Fri Jan  4 23:45:33 2019
###########################################
#coding=utf-8
#!/usr/bin/python

import random
import json

if __name__ == '__main__':
    max_lon = 43.7728
    min_lon = 43.6274
    max_lat = -79.2787
    min_lat = -79.5541

    ls = []
    while len(ls) < 200:
        a = round(random.uniform(min_lon, max_lon), 4)
        b = round(random.uniform(min_lat, max_lat), 4)
        c = random.randint(200,400)
        dt = {"longitude": b, "latitude": a, "key": len(ls), "price": c}
        if dt not in ls:
            ls.append(dt)
    with open('prices.json', 'w') as f:
        json.dump(ls, f)
