import { RainwaveWebSDK, Station } from 'rainwave-websocket-sdk/src/web';
import React, { ReactElement, useEffect, useState } from 'react';

const MAX_DEBUG_MESSAGES = -10;

function App(): ReactElement {
  const [debug, setDebug] = useState<string[]>([]);
  const [error, setError] = useState('No errors.');
  const [nowPlaying, setNowPlaying] = useState('Connecting.');

  useEffect(() => {
    async function init(): Promise<void> {
      const rainwave = RainwaveWebSDK({
        userId: 2,
        apiKey: 'aR9qhF1G7n',
        sid: Station.game,
        onSocketError: () => setError('Could not connect to Rainwave.'),
        debug: (msg) => {
          setDebug(
            [...debug, msg instanceof Error ? `${msg.message} - ${msg.name}` : msg].slice(
              MAX_DEBUG_MESSAGES,
            ),
          );
        },
        url: 'wss://core.rainwave.cc/api4/websocket/',
      });
      rainwave.on('sched_current', (schedCurrent) => {
        const song = schedCurrent.songs[0];
        setNowPlaying(`${song.albums[0].name} - ${song.title}`);
      });
      await rainwave.startWebSocketSync();
    }

    void init();
  }, []);

  return (
    <div>
      <p>{nowPlaying}</p>
      <p>{error}</p>
      <ul>
        {debug.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export { App };
