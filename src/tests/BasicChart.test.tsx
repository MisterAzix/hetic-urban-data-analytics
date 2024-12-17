import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BasicChart from '../components/charts/BasicChart';
import { describe, it, expect } from 'vitest';

describe('BasicChart', () => {
  it('renders the BarChart component', () => {
    render(<BasicChart />);
    const desktopBars = screen.getByText('Desktop');
    const mobileBars = screen.getByText('Mobile');

    expect(desktopBars).toBeInTheDocument();
    expect(mobileBars).toBeInTheDocument();
  });

  it('renders the correct number of bars', () => {
    render(<BasicChart />);
    const bars = document.querySelectorAll('rect.recharts-bar-rectangle');

    expect(bars.length).toBeGreaterThan(0); // Vérifie qu'il y a des barres
  });

  it('displays the months in short format on the X-axis', () => {
    render(<BasicChart />);
    expect(screen.getByText('Jan')).toBeInTheDocument();
    expect(screen.getByText('Feb')).toBeInTheDocument();
    expect(screen.getByText('Mar')).toBeInTheDocument();
  });
});
