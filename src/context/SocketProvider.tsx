'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from 'react';
import { socket } from '@/lib/socket';
import { Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket;
  isConnected: boolean;
  transport: string;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [transport, setTransport] = useState('N/A');

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
    };

    const onDisconnect = () => {
      setIsConnected(false);
      setTransport('N/A');
    };

    const onUpgrade = (transport: { name: string }) => {
      setTransport(transport.name);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.io.engine.on('upgrade', onUpgrade);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.io.engine.off('upgrade', onUpgrade);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected, transport }}>
      {children}
    </SocketContext.Provider>
  );
};

// TODO: Use this hook to access the socket instance
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
