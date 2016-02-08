# NYPL Labs - Where?

See http://spacetime.nypl.org/where/.

Where? is a web application (and [Chrome Extension](https://github.com/nypl-spacetime/where-tab)) for crowdsourced image geotagging. Where? is part of NYPL Labs' [Space/Time Directory project](http://spacetime.nypl.org/)

## Example

From:

![](example/screenshot.png)

To: 

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "uuid": "510d47d9-4ec5-a3d9-e040-e00a18064a99",
        "imageId": "482572",
        "step": "location",
        "url": "http://digitalcollections.nypl.org/items/510d47d9-4ec5-a3d9-e040-e00a18064a99"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.944441,
          40.714447
        ]
      }
    }
  ]
}

```

See the [GeoJSON file](example/data.geojson) in the `example` directory for a complete data file, including bearing information.

## API

See [Where? API](https://github.com/nypl-spacetime/where-api).

## Other image collections

Currently, Where? works with images from NYPL's [Digital Collections](http://digitalcollections.nypl.org/). However, it should be very easy to add images from other, non-NYPL collections.
