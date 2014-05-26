#! /usr/bin/env python
# -*- coding: utf-8 -*-

import os

cache_home = 'tmp'

def get_cache_file(path):
    ''' get cache file. '''
    cachefile = os.path.join(cache_home, path)
    cachedir = os.path.dirname(cachefile)
    if not os.path.isdir(cachedir):
        os.makedirs(cachedir)
    return cachefile    
