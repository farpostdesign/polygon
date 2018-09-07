import Head from 'next/head';
import { Button, H1 } from "@blueprintjs/core";

export default () =>
  <nav>
    <Head>
      <link rel="stylesheet" href="/static/normalize.css" />
      <link rel="stylesheet" href="/static/blueprintjs/lib/css/blueprint.css" />
    </Head>
    <H1>P</H1>
    <Button icon="add" large={true} onClick={() => console.log('WIP')} />
  </nav>

