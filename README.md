# Common BE API

This repo is meant to consolidate small chunks of API integrations, related to my portfolio, to avoid the need for deploying each one separately.

## Mailing service

Designed to get an HTML body from the `/send` endpoint and fetch the Sendsay mailing service.
The format of the body should be aligned with the format of the Sendsay message field. 

```ts
fetch("<BASE_URL>/send", {
      ...
      body: JSON.stringify({
        html: `<h3>Name: ${name}</h3>
               <h4>Email: ${email}</h4>
               <p>Message: ${message}</p>
              `,
      }),
    })
```

#### Related links:

[Sendsay dashboard](https://app.sendsay.ru/dashboard) <br/>
[Sendsay API documentation](https://docs.sendsay.ru/sendsay-api) <br/>
[Deno deploy](https://console.deno.com/sergei-svetashev/deno-sample-be)