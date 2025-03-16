import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectCoinFlipState } from '../../features/gamesSlice';

import headsImg from '../../../public/coinHeads.webp';
import tailsImg from '../../../public/coinTails.webp';

interface CoinProps {
  spinning: boolean;
  result: number | null;
}

const Coin: React.FC<CoinProps> = ({ spinning, result }) => {
  const { gameState } = useSelector(selectCoinFlipState);
  const controls = useAnimation();

  useEffect(() => {
    const spinCoin = () => {
      controls.set({ rotateY: 0 });
      controls.start({ 
        rotateY: 3600, 
        transition: { 
          duration: 5, 
          ease: "linear" 
        } 
      });
    };

    const slowSpin = () => {
      const finalRotation = result === 0 ? 3600 + 360 : 3600 + 540;
      controls.start({ 
        rotateY: finalRotation, 
        transition: { 
          duration: 2, 
          ease: [0.33, 1, 0.68, 1] 
        } 
      });
    };

    if (gameState.heads.players || gameState.tails.players) {
      spinCoin();
    } else if (result !== null) {
      slowSpin();
    }
  }, [result, gameState, controls]);

  return (
    <div className="coin-container">
      <motion.div className="coin" animate={controls}>
        <div 
          className="face front" 
          style={{ backgroundImage: `url(${headsImg})` }} 
        />
        <div 
          className="face back" 
          style={{ backgroundImage: `url(${tailsImg})` }} 
        />
      </motion.div>
    </div>
  );
};

export default Coin;