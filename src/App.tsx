import classNames from 'classnames/bind';
import { useCallback, useEffect, useState } from 'react';
import styles from './App.module.scss';

import { Unity, useUnityContext } from 'react-unity-webgl';

import { CharacterChoice } from './components/CharacterChoice';

const cx = classNames.bind(styles);

export function App() {
  const [currentModel, setCurrentModel] = useState(0);

  const [gameStart, setGameStart] = useState(false);

  const { unityProvider, sendMessage, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: 'Build/build.loader.js',
      dataUrl: 'Build/build.data.gz',
      frameworkUrl: 'Build/build.framework.js.gz',
      codeUrl: 'Build/build.wasm.gz',
    });

  function GameStart() {
    setGameStart(true);
    sendMessage('GameManager', 'GameStart', currentModel);
  }

  const [gameOver, setGameOver] = useState(false);

  const handleGameOver = useCallback((gameOver: boolean) => {
    // setIsGameOver(true);
    // setUserName(userName);
    // setScore(score);
    setGameOver(gameOver);
  }, []);

  useEffect(() => {
    addEventListener('GameOver', handleGameOver);
    return () => {
      removeEventListener('GameOver', handleGameOver);
    };
  }, [addEventListener, removeEventListener, handleGameOver]);

  return (
    <div className={cx('container')} data-temp={gameOver}>
      {!gameStart && (
        <div className={cx('character')} data-on={currentModel}>
          <div
            className={cx('tank')}
            data-tank="0"
            onClick={() => {
              setCurrentModel(0);
            }}
          ></div>
          <div
            className={cx('tank')}
            data-tank="1"
            onClick={() => {
              setCurrentModel(1);
            }}
          ></div>
          <div
            className={cx('tank')}
            data-tank="2"
            onClick={() => {
              setCurrentModel(2);
            }}
          ></div>
          <button
            type="button"
            className={cx('gameStartButton')}
            onClick={GameStart}
            data-show={gameStart}
          >
            GAME START
          </button>
        </div>
      )}
      <div className={cx('gameView')}>
        <Unity
          unityProvider={unityProvider}
          style={{
            width: '1280px',
            height: '720px',
            display: gameStart ? 'block' : 'none',
          }}
        />
      </div>
      {/* 게임 시작 버튼 */}
      {/* <div className='gameStart'>
        <button type="button">게임시작</button>
      </div> */}
      {/* 팀 캐릭터 선택 */}
      {/* <div className="team">
        <button
          onClick={() => {
            setCurrentTeam('A');
          }}
        >
          A팀
        </button>
        <br />
        <button
          onClick={() => {
            setCurrentTeam('B');
          }}
        >
          B팀
        </button>
        <br />
        {characterA}
        <br />
        {characterB}
      </div>

      {currentTeam == 'A' && (
        <CharacterChoice team="A" characterSelecter={characterSelecter} />
      )}
      {currentTeam == 'B' && (
        <CharacterChoice team="B" characterSelecter={characterSelecter} />
      )} */}
    </div>
  );
}
