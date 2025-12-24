import { useState, useEffect, useRef } from 'react';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isMusicModalOpen, setIsMusicModalOpen] = useState(false);

  // Music State
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  const [playbackMode, setPlaybackMode] = useState('sequential');
  const [selectedPlaylist, setSelectedPlaylist] = useState('playlist1');
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Volume Control State
  const [volume, setVolume] = useState(0.7);

  // Auto-save State
  const [autoSave, setAutoSave] = useState(false);

  // Per-page Configuration State
  const [currentPage, setCurrentPage] = useState('home');
  const [pageSpecificSettings, setPageSpecificSettings] = useState({});

  // Track Preview State
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [previewTrackIndex, setPreviewTrackIndex] = useState(null);

  // Temporary state for modal (before saving)
  const [tempMusicEnabled, setTempMusicEnabled] = useState(false);
  const [tempPlaybackMode, setTempPlaybackMode] = useState('sequential');
  const [tempSelectedPlaylist, setTempSelectedPlaylist] = useState('playlist1');
  const [tempVolume, setTempVolume] = useState(0.7);
  const [tempAutoSave, setTempAutoSave] = useState(false);

  const audioRef = useRef(null);
  const previewAudioRef = useRef(null);

  // Available playlists
  const playlists = {
    playlist1: {
      name: 'Underground Beats',
      tracks: [
        '/Music/01The_Last_Dance_KLICKAUD.mp3',
        '/Music/Alex_Wann_-_Milkshake_Original_Mix_KLICKAUD.mp3',
        '/Music/Edu_Imbernon_-_Leopard_Boy_Next_Door_Remix_FULL_TRACK_KLICKAUD.mp3',
        '/Music/Empire_Of_The_Sun_-_We_Are_The_People_Flic_Flac_Remix_HD_KLICKAUD.mp3',
        '/Music/Third_Son_Wally_Lopez_-_Geometry_Solee_Remix_-_Cut_Parquet_Recordings_KLICKAUD.mp3'
      ]
    },
    playlist2: {
      name: 'Chill & Focus',
      tracks: [
        '/Music/Guy_J_-_Fixation_KLICKAUD.mp3',
        '/Music/ME_Black_Coffee_-_The_Rapture_PtIII_KLICKAUD.mp3',
        '/Music/NOW_ON_ANGHAMI_SPOTIFY_APPLE_MUSIC_ETC_Get_Lucky_KLICKAUD.mp3',
        '/Music/Pavel_Petrov_-_Bogota_Trapez_LTD_KLICKAUD.mp3'
      ]
    },
    playlist3: {
      name: 'Premium Selection',
      tracks: [
        '/Music/PREMIERE_Booka_Shade_Jan_Blomqvist_-_Blaze_Extended_Blaufield_Music_KLICKAUD.mp3',
        '/Music/PREMIERE_Kasper_Koman_-_In_Circles_Original_Mix_Juicebox_Music_KLICKAUD.mp3',
        '/Music/PREMIERE_KYOTTO_-_Would_You_Be_There_When_the_World_Fails_3rd_Avenue_KLICKAUD.mp3',
        '/Music/Solomun_-_Somebodys_Story_Out_now_on_Compost_Records_KLICKAUD.mp3',
        '/Music/Sébastien_Léger_-_Serpentine_-_OUT_NOW_KLICKAUD.mp3',
      ]
    }
  };

  const playbackModes = [
    { value: 'sequential', label: 'Sequential Play' },
    { value: 'shuffle', label: 'Shuffle' },
    { value: 'repeat-one', label: 'Repeat One' },
    { value: 'repeat-all', label: 'Repeat All' }
  ];

  // Detect current page based on URL
  useEffect(() => {
    const detectCurrentPage = () => {
      const path = window.location.pathname;
      if (path === '/' || path === '/index.html') return 'home';
      if (path.includes('/games')) return 'games';
      if (path.includes('/profile')) return 'profile';
      if (path.includes('/leaderboard')) return 'leaderboard';
      return 'home';
    };

    setCurrentPage(detectCurrentPage());

    window.addEventListener('popstate', () => {
      setCurrentPage(detectCurrentPage());
    });
  }, []);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('musicSettings');
      const savedPageSettings = localStorage.getItem('musicPageSettings');
      const savedAutoSave = localStorage.getItem('musicAutoSave');

      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setIsMusicEnabled(settings.enabled || false);
        setPlaybackMode(settings.playbackMode || 'sequential');
        setSelectedPlaylist(settings.playlist || 'playlist1');
        setCurrentTrackIndex(settings.trackIndex || 0);
        setVolume(settings.volume ?? 0.7);

        setTempMusicEnabled(settings.enabled || false);
        setTempPlaybackMode(settings.playbackMode || 'sequential');
        setTempSelectedPlaylist(settings.playlist || 'playlist1');
        setTempVolume(settings.volume ?? 0.7);
      }

      if (savedPageSettings) {
        setPageSpecificSettings(JSON.parse(savedPageSettings));
      }

      if (savedAutoSave) {
        const autoSaveEnabled = JSON.parse(savedAutoSave);
        setAutoSave(autoSaveEnabled);
        setTempAutoSave(autoSaveEnabled);
      }
    } catch (error) {
      console.error('Error loading music settings:', error);
    }
  }, []);

  // Apply per-page settings when page changes
  useEffect(() => {
    if (pageSpecificSettings[currentPage]) {
      const pageSettings = pageSpecificSettings[currentPage];
      setIsMusicEnabled(pageSettings.enabled ?? isMusicEnabled);
      setVolume(pageSettings.volume ?? volume);
      setSelectedPlaylist(pageSettings.playlist ?? selectedPlaylist);
    }
  }, [currentPage]);

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && isMusicModalOpen) {
      const autoSaveTimeout = setTimeout(() => {
        saveSettingsInternal(false);
      }, 2000);

      return () => clearTimeout(autoSaveTimeout);
    }
  }, [tempMusicEnabled, tempPlaybackMode, tempSelectedPlaylist, tempVolume, autoSave]);

  // Save settings to localStorage
  const saveSettingsInternal = (closeModal = true) => {
    try {
      const settings = {
        enabled: tempMusicEnabled,
        playbackMode: tempPlaybackMode,
        playlist: tempSelectedPlaylist,
        trackIndex: currentTrackIndex,
        volume: tempVolume
      };
      localStorage.setItem('musicSettings', JSON.stringify(settings));

      const updatedPageSettings = {
        ...pageSpecificSettings,
        [currentPage]: {
          enabled: tempMusicEnabled,
          playlist: tempSelectedPlaylist,
          volume: tempVolume
        }
      };
      setPageSpecificSettings(updatedPageSettings);
      localStorage.setItem('musicPageSettings', JSON.stringify(updatedPageSettings));

      localStorage.setItem('musicAutoSave', JSON.stringify(tempAutoSave));

      setIsMusicEnabled(tempMusicEnabled);
      setPlaybackMode(tempPlaybackMode);
      setSelectedPlaylist(tempSelectedPlaylist);
      setVolume(tempVolume);
      setAutoSave(tempAutoSave);

      if (closeModal) {
        setIsMusicModalOpen(false);
      }
    } catch (error) {
      console.error('Error saving music settings:', error);
      alert('Unable to save music settings');
    }
  };

  const saveSettings = () => {
    saveSettingsInternal(true);
  };

  // Initialize audio elements
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.addEventListener('ended', handleTrackEnd);
      audioRef.current.addEventListener('error', handleAudioError);
    }

    if (!previewAudioRef.current) {
      previewAudioRef.current = new Audio();
      previewAudioRef.current.volume = 0.5;
      previewAudioRef.current.addEventListener('ended', () => {
        setIsPreviewPlaying(false);
        setPreviewTrackIndex(null);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleTrackEnd);
        audioRef.current.removeEventListener('error', handleAudioError);
      }
      if (previewAudioRef.current) {
        previewAudioRef.current.pause();
      }
    };
  }, []);

  // Update main audio volume when saved volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Apply temp volume changes in real-time for immediate feedback
  useEffect(() => {
    if (audioRef.current && isMusicModalOpen) {
      audioRef.current.volume = tempVolume;
    }
  }, [tempVolume, isMusicModalOpen]);

  // Handle audio errors
  const handleAudioError = (e) => {
    console.error('Audio playback error:', e);
    playNextTrack();
  };

  // Handle track end
  const handleTrackEnd = () => {
    if (playbackMode === 'repeat-one') {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      playNextTrack();
    }
  };

  // Play next track based on mode
  const playNextTrack = () => {
    const playlist = playlists[selectedPlaylist];
    const totalTracks = playlist.tracks.length;

    if (playbackMode === 'shuffle') {
      const nextIndex = Math.floor(Math.random() * totalTracks);
      setCurrentTrackIndex(nextIndex);
    } else if (playbackMode === 'repeat-all') {
      setCurrentTrackIndex((currentTrackIndex + 1) % totalTracks);
    } else if (playbackMode === 'sequential') {
      if (currentTrackIndex < totalTracks - 1) {
        setCurrentTrackIndex(currentTrackIndex + 1);
      } else {
        stopMusic();
      }
    }
  };

  // Control music playback
  useEffect(() => {
    if (isMusicEnabled && audioRef.current) {
      const playlist = playlists[selectedPlaylist];
      const trackUrl = playlist.tracks[currentTrackIndex];

      audioRef.current.src = trackUrl;
      audioRef.current.volume = volume;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        });
    } else {
      stopMusic();
    }
  }, [isMusicEnabled, selectedPlaylist, currentTrackIndex]);

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // Preview track functionality
  const togglePreview = (trackIndex) => {
    if (isPreviewPlaying && previewTrackIndex === trackIndex) {
      previewAudioRef.current.pause();
      previewAudioRef.current.currentTime = 0;
      setIsPreviewPlaying(false);
      setPreviewTrackIndex(null);
    } else {
      const playlist = playlists[tempSelectedPlaylist];
      const trackUrl = playlist.tracks[trackIndex];

      previewAudioRef.current.src = trackUrl;
      previewAudioRef.current.currentTime = 0;
      previewAudioRef.current.play()
        .then(() => {
          setIsPreviewPlaying(true);
          setPreviewTrackIndex(trackIndex);

          setTimeout(() => {
            if (previewAudioRef.current && !previewAudioRef.current.paused) {
              previewAudioRef.current.pause();
              previewAudioRef.current.currentTime = 0;
              setIsPreviewPlaying(false);
              setPreviewTrackIndex(null);
            }
          }, 15000);
        })
        .catch(error => {
          console.error('Error playing preview:', error);
          setIsPreviewPlaying(false);
          setPreviewTrackIndex(null);
        });
    }
  };

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 20;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isShareModalOpen &&
        !e.target.closest('.social-dropdown') &&
        !e.target.closest('.header-action-wrapper')) {
        setIsShareModalOpen(false);
      }

      if (isMusicModalOpen &&
        !e.target.closest('.music-modal') &&
        !e.target.closest('.header-action-wrapper')) {
        setIsMusicModalOpen(false);
        if (isPreviewPlaying) {
          previewAudioRef.current.pause();
          setIsPreviewPlaying(false);
          setPreviewTrackIndex(null);
        }
      }
    };

    if (isShareModalOpen || isMusicModalOpen) {
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 0);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isShareModalOpen, isMusicModalOpen, isPreviewPlaying]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (isShareModalOpen) setIsShareModalOpen(false);
        if (isMusicModalOpen) {
          setIsMusicModalOpen(false);
          if (isPreviewPlaying) {
            previewAudioRef.current.pause();
            setIsPreviewPlaying(false);
            setPreviewTrackIndex(null);
          }
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isShareModalOpen, isMusicModalOpen, isPreviewPlaying]);

  // Open music modal
  const openMusicModal = () => {
    setTempMusicEnabled(isMusicEnabled);
    setTempPlaybackMode(playbackMode);
    setTempSelectedPlaylist(selectedPlaylist);
    setTempVolume(volume);
    setTempAutoSave(autoSave);
    setIsMusicModalOpen(true);
  };

  // Close music modal without saving
  const closeMusicModal = () => {
    setIsMusicModalOpen(false);
    if (isPreviewPlaying) {
      previewAudioRef.current.pause();
      setIsPreviewPlaying(false);
      setPreviewTrackIndex(null);
    }
  };

  const socialLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com/8jjofficials', icon: '/images/facebook.png' },
    { name: 'Instagram', url: 'https://www.instagram.com/8jj_gamesofficial?igsh=MWEwamhsaXcwMWNwcw==', icon: '/images/instagram.png' },
    { name: 'WhatsApp', url: 'https://chat.whatsapp.com/EP5RmVKop9rHPrmCxP5Krp?mode=wwc', icon: '/images/whatsapp.png' },
    { name: 'Telegram', url: 'https://t.me/Official8JJGames', icon: '/images/telegram1.png' },
    { name: 'YouTube', url: 'https://youtube.com/@8jj_gamesofficial?si=eNSRKuTPdeZcCufS', icon: '/images/Youtube.png' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@8jjofficials', icon: '/images/Tiktok.png' },
    { name: 'X', url: 'https://x.com/8JJ_Games?t=4GAWbf3qpFkbP4y8mrmWwQ&s=08', icon: '/images/x.png' },
    { name: 'Twitch', url: 'https://www.twitch.tv/8jj_gamesofficial', icon: '/images/twitch.png' }
  ];

  return (
    <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
      <div className="header-inner">

        <a className="header-logo" href="/" aria-label="8JJ Home">
          <img
            className="header-logo__img"
            src="/images/8JJ LOGO.png"
            alt="8JJ Logo"
            loading="eager"
          />
        </a>

        <div className="header-actions">
          <div className="header-action-wrapper">
            <button
              className={`header-action ${isMusicEnabled && isPlaying ? 'header-action--active' : ''}`}
              aria-label="Music Control"
              onClick={openMusicModal}
            >
              {isMusicEnabled && isPlaying ? (
                <img
                  className="header-action__icon"
                  src="/images/MusicPlay.gif"
                  alt=""
                  loading="lazy"
                />
              ) : (
                <svg
                  className="header-action__icon music-icon-off"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  style={{
                    '--icon-color': '#FFB800',
                    '--icon-stroke': '2',
                    '--slash-color': '#ff3b3b',
                    '--icon-opacity': '1',
                  }}
                >
                  <g
                    className="music-note"
                    stroke="var(--icon-color)"
                    strokeWidth="var(--icon-stroke)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="var(--icon-opacity)"
                  >
                    <path d="M9 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                    <path d="M9 18V5l10-2v11" />
                    <path d="M19 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                  </g>
                  <line
                    className="slash-line"
                    x1="3"
                    y1="3"
                    x2="21"
                    y2="21"
                    stroke="var(--slash-color)"
                    strokeWidth="var(--icon-stroke)"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>

            {isMusicModalOpen && (
              <div className="music-modal music-modal--enhanced">
                <div className="music-modal__header">
                  <div>
                    <h3 className="music-modal__title">Music Control</h3>
                  </div>
                  <button
                    className="music-modal__close"
                    onClick={closeMusicModal}
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>

                <div className="music-control">
                  <span className="music-control__label">
                    {tempMusicEnabled ? 'Music On' : 'Background Music'}
                  </span>
                  <label className="music-toggle">
                    <input
                      type="checkbox"
                      checked={tempMusicEnabled}
                      onChange={(e) => setTempMusicEnabled(e.target.checked)}
                      aria-label="Toggle music"
                    />
                    <span className="music-toggle__slider"></span>
                  </label>
                </div>

                <div className="music-volume-control">
                  <label className="music-dropdown__label">
                    Volume: {Math.round(tempVolume * 100)}%
                  </label>
                  <div className="volume-slider-container">
                    <span className="volume-icon">🔈</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={tempVolume * 100}
                      onChange={(e) => setTempVolume(e.target.value / 100)}
                      className="volume-slider"
                      disabled={!tempMusicEnabled}
                    />
                    <span className="volume-icon">🔊</span>
                  </div>
                </div>

                <div className="music-dropdown-group">
                  <label className="music-dropdown__label">Playback Mode</label>
                  <select
                    className="music-dropdown"
                    value={tempPlaybackMode}
                    onChange={(e) => setTempPlaybackMode(e.target.value)}
                    disabled={!tempMusicEnabled}
                  >
                    {playbackModes.map(mode => (
                      <option key={mode.value} value={mode.value}>
                        {mode.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="music-dropdown-group">
                  <label className="music-dropdown__label">Select Music</label>
                  <select
                    className="music-dropdown"
                    value={tempSelectedPlaylist}
                    onChange={(e) => {
                      setTempSelectedPlaylist(e.target.value);
                      if (isPreviewPlaying) {
                        previewAudioRef.current.pause();
                        setIsPreviewPlaying(false);
                        setPreviewTrackIndex(null);
                      }
                    }}
                    disabled={!tempMusicEnabled}
                  >
                    {Object.entries(playlists).map(([key, playlist]) => (
                      <option key={key} value={key}>
                        {playlist.name}
                      </option>
                    ))}
                  </select>

                  {tempMusicEnabled && (
                    <div className="track-preview-section">
                      <div className="track-preview-header">
                        <span className="track-preview-label">Preview Tracks:</span>
                      </div>
                      <div className="track-list">
                        {playlists[tempSelectedPlaylist].tracks.map((track, index) => {
                          const trackName = track.split('/').pop().replace('.mp3', '').replace(/_/g, ' ');
                          const isCurrentPreview = isPreviewPlaying && previewTrackIndex === index;

                          return (
                            <button
                              key={index}
                              className={`track-preview-btn ${isCurrentPreview ? 'playing' : ''}`}
                              onClick={() => togglePreview(index)}
                            >
                              <span className="track-number">{index + 1}</span>
                              <span className="track-name">{trackName.substring(0, 30)}...</span>
                              <span className="track-icon">
                                {isCurrentPreview ? '⏸' : '▶'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="music-control">
                  <span className="music-control__label">
                    Auto-save Changes
                  </span>
                  <label className="music-toggle">
                    <input
                      type="checkbox"
                      checked={tempAutoSave}
                      onChange={(e) => setTempAutoSave(e.target.checked)}
                      aria-label="Toggle auto-save"
                    />
                    <span className="music-toggle__slider"></span>
                  </label>
                </div>

                {autoSave && (
                  <div className="auto-save-indicator">
                    <span className="auto-save-text">✓ Auto-save enabled</span>
                  </div>
                )}

                <div className="music-modal__actions">
                  <button
                    className="music-btn music-btn--secondary"
                    onClick={closeMusicModal}
                  >
                    Close
                  </button>
                  <button
                    className="music-btn music-btn--primary"
                    onClick={saveSettings}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>

          <a
            className="header-action"
            href="#download"
            aria-label="Download App"
          >
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="icon icon-download"
              aria-hidden="true"
            >

              <rect
                x="10"
                y="3"
                width="4"
                height="10"
                rx="1"
                fill="currentColor"
              />


              <path
                d="M6 11
       L12 17
       L18 11
       Z"
                fill="currentColor"
              />


              <rect
                x="4"
                y="19"
                width="16"
                height="2.5"
                rx="1.25"
                fill="currentColor"
              />
            </svg>



          </a>

          <div className="header-action-wrapper">
            <button
              className={`header-action ${isShareModalOpen ? 'header-action--share-active' : ''}`}
              aria-label="Share"
              onClick={() => setIsShareModalOpen(!isShareModalOpen)}
            >
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="icon icon-share"
                aria-hidden="true"
              >
                <circle cx="18" cy="5" r="3" fill="currentColor" />
                <circle cx="6" cy="12" r="3" fill="currentColor" />
                <circle cx="18" cy="19" r="3" fill="currentColor" />

                <line
                  x1="8.6"
                  y1="10.8"
                  x2="15.4"
                  y2="6.2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="8.6"
                  y1="13.2"
                  x2="15.4"
                  y2="17.8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

            </button>

            {isShareModalOpen && (
              <div className="social-dropdown open">
                <div className="social-dropdown-arrow"></div>
                <div className="social-dropdown-panel">
                  <div className="social-grid">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        className="social-item"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                      >
                        <img
                          src={social.icon}
                          alt={social.name}
                          className="social-icon"
                          loading="lazy"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}