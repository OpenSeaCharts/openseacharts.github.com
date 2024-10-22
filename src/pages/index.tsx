import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import * as React from 'react';
import Map from 'react-map-gl/maplibre';

import styles from './index.module.css';

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    // <div style={{backgroundColor: "red", height: "100%", flex: "1"}}>test</div>
    <Layout>
      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 12
        }}
        onLoad={e => {
          // e.target.resize();
        }}
        attributionControl={null}
        style={{flex: "1"}}
        mapStyle="https://tiles.versatiles.org/assets/styles/colorful.json"
      />
    </Layout>
  );
}
