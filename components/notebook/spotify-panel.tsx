import styles from "./notebook.module.css";

export default function SpotifyPanel() {
  return (
    <div className={styles.spotifyExperience}>
      <div className={styles.spotifyHero}>
        <div className={styles.spotifyAlbumArt} aria-hidden="true">
          <span>F</span>
          <span>D</span>
        </div>
        <div className={styles.spotifyMeta}>
          <p className={styles.spotifyEyebrow}>Now Playing</p>
          <h2 className={styles.spotifyTitle}>Fallen Down (Reprise)</h2>
          <p className={styles.spotifyArtist}>Toby Fox</p>
          <div className={styles.spotifyProgressGroup}>
            <div className={styles.spotifyProgressBar} aria-hidden="true">
              <span className={styles.spotifyProgressFill} />
            </div>
            <div className={styles.spotifyProgressLabels}>
              <span>1:38</span>
              <span>2:04</span>
            </div>
          </div>
        </div>
      </div>

      <iframe
        className={styles.spotifyEmbed}
        src="https://open.spotify.com/embed/track/23b9BdZ2WZnDSeDzNUTVvZ?utm_source=generator"
        width="100%"
        height="352"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        title="Spotify embed: Fallen Down (Reprise) by Toby Fox"
      />
    </div>
  );
}
