# intraweb

## Installation

NPM:
```
npm i -g @liquid-labs/intraweb
```

## Usage

**NOTE**: It is currently necessary to perform an additional manual step to secure your site after deploy. See '[Finalizing setup](#finalizing-setup).'

Before using:

* You must have a `gcloud` installed with an active, authenticated user.
* You have some content to deploy from a directory. This is easy to change later, so you could create a temp directory with an boilerplate `index.html` to get started.
* You will need to provide a valid email address for the "support email". This can be a user or group.

```
# not requride, but useful:
gcloud config configurations create internal-your-domain-com

intraweb add --assume-defaults --site internal.your-domain.com
# you will be asked a series of questions

intraweb deploy --site internal.your-domain.com
```

**NOTE**: It is currently necessary to perform an additional manual step to secure your site after deploy. See '[Finalizing setup](#finalizing-setup).'

## Finalizing setup

In the current alpha-implementation, it is necessary to perform final activation of the Identity Aware Proxy through the Google console.

1. Navigate to [https://console.cloud.google.com/security/iap]
2. Select your project.
3. Look for the appengine in the list of resources. If this is a new project, it will be the only option available.
4. Toggle the 'IAP' switch.
5. Click 'App Engine app'. (NOT the URL.)
6. In the sidebar that opens up, click "Add member".
7. In the box, enter your email or a group email (like, 'team@your-domain.com').
8. In the roles dropdown, select 'Cloud IAP -> IAP-secured Web App User'
