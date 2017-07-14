# `adb-ga-trace`

[![Build Status](https://travis-ci.org/aeirola/adb-ga-trace.svg?branch=master)](https://travis-ci.org/aeirola/adb-ga-trace)

Pretty print your Android Google Analytics debug logs.

Instead of looking at logs like this

```
07-14 18:23:39.468  6093  6121 D GAv4    : Hit delivery requested: ht=1500045819082, _s=7667, _v=ma8.4.87, a=756284080, adid=3018087d-3fcf-40a6-8d8c-3319f934b834, aid=com.google.android.dialer, aiid=com.android.vending, an=Phone, ate=1, av=9.0.155139499, cd=com.google.android.apps.dialer.extensions.GoogleDialtactsActivity.SpeedDialFragment, cid=c107f93a-9b02-4be3-b54a-3be9e46ed929, sr=1080x1794, t=screenview, tid=UA-53072813-1, ul=en-gb, v=1
07-14 18:23:40.186  6093  6121 D GAv4    : Hit sent to the device AnalyticsService for delivery
```

You could be looking at logs like this (+ colors!):

```
------- 2017-07-14T15:23:39.468Z -------
 Protocol Version: 1
 Tracking ID / Web Property ID: UA-53072813-1
 Client ID: c107f93a-9b02-4be3-b54a-3be9e46ed929
 Screen Resolution: 1080x1794
 User Language: en-gb
 Hit type: screenview
 Screen Name: com.google.android.apps.dialer.extensions.GoogleDialtactsActivity.SpeedDialFragment
 Application Name: Phone
 Application ID: com.google.android.dialer
 Application Version: 9.0.155139499
 Application Installer ID: com.android.vending
 Hit time: 1500045819082
 a: 756284080
 _s: 7667
 _v: ma8.4.87
 adid: 3018087d-3fcf-40a6-8d8c-3319f934b834
 ate: 1
----------------------------------------

Hit sent to the device AnalyticsService for delivery
```

## Usage

Install with:

```bash
npm install -g adb-ga-trace
```

Connect your device, or fire up your simulator, and run with:

```bash
adb-ga-trace
```

You will need to have `adb` installed for the connection to work
