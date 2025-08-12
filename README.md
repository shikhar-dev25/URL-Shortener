## URL Shortener

## Features

- Shorten long URLs into short codes  
- Validate input URLs  
- Redirect short URLs to original links  
- Optional custom short codes  
- Data stored in memory (resets on server restart)


## How to Use

Send a POST request to `/shorten` with JSON:

``` json
    {
    "url": "https://example.com",
    "customCode": "optionalCode"
    }
```



