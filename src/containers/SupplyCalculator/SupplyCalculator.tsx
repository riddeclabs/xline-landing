import React, { useState, useCallback, useMemo } from 'react';
import classes from './SupplyCalculator.module.scss';
import { Toggle } from './components/toggle/Toggle';
import { cur, pct } from '../../helpers';
import { useAnalyticsEventTracker } from '../../analytics/hooks';
import debounce from 'lodash.debounce';

enum Currencies {
  BTC = 'BTC',
  ETH = 'ETH',
}

type RangeConfig = { min: number; max: number; step: number };

const UtilizationFactor = 0.9;
const CollateralFactor = 0.8;

const Prices: Record<Currencies, number> = {
  [Currencies.ETH]: 1850,
  [Currencies.BTC]: 28601,
};

const Range: Record<Currencies, RangeConfig> = {
  [Currencies.ETH]: {
    min: 0,
    max: 27,
    step: 0.05,
  },
  [Currencies.BTC]: {
    min: 0,
    max: 1.75,
    step: 0.005,
  },
};

export const SupplyCalculator: React.FC = () => {
  const [currency, setCurrecny] = useState(Currencies.ETH);
  const [totalSupply, setTotalSupply] = useState(0);
  const [actualLoan, setActualLoan] = useState(0);

  const track = useAnalyticsEventTracker('Calculator');

  const onCurrencyChange = useCallback((v: string) => {
    track({ action: 'user_change_currency', label: v });
    setCurrecny(v as Currencies);
    setTotalSupply(0);
    setActualLoan(0);
  }, []);

  const trackSupplyDebounced = useCallback(
    debounce((v: number) => {
      track({ action: `user_change_supply_${currency}`, value: v });
      track({ action: 'user_change_supply_usd', value: Prices[currency] * v });
    }, 500),
    []
  );

  const onSupplyChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Number(e.target.value);
      setTotalSupply(v);
      trackSupplyDebounced(v);
      setActualLoan(0);
    },
    []
  );

  const trackLoanDebounced = useCallback(
    debounce((v: number) => {
      track({ action: `user_change_loan_${currency}`, value: v });
      track({ action: 'user_change_loan_usd', value: Prices[currency] * v });
    }, 500),
    []
  );

  const onActualLoanChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Number(e.target.value);
      setActualLoan(v);
      trackLoanDebounced(v);
    },
    []
  );

  const MaxLoanRange: RangeConfig = useMemo(() => {
    if (totalSupply) {
      return {
        min: 0,
        max: totalSupply * CollateralFactor,
        step: Range[currency].step,
      };
    } else {
      return {
        min: 0,
        max: 0,
        step: 0,
      };
    }
  }, [totalSupply, currency]);

  const actualLoanUSD = useMemo(() => {
    return actualLoan ? actualLoan * Prices[currency] : 0;
  }, [actualLoan, currency]);

  const totalSupplyUSD = useMemo(() => {
    return totalSupply ? totalSupply * Prices[currency] : 0;
  }, [totalSupply, currency]);

  const liquidationThreshold = useMemo(() => {
    if (actualLoanUSD && totalSupply) {
      return actualLoanUSD / UtilizationFactor / totalSupply;
    }
    return 0;
  }, [currency, actualLoanUSD, totalSupply]);
  return (
    <div className={classes.container}>
      <h3 className={classes.title}>Select cOLLATERAL</h3>
      <Toggle
        values={Object.values(Currencies)}
        selected={currency as string}
        onChange={onCurrencyChange}
      />
      <div className={classes.separator} />
      <h3 className={classes.title}>Select Supply</h3>
      <div className={classes.sliderHeader}>
        <span className={classes.sliderTitle}>Total Supply</span>
        <span className={classes.value}>
          {cur(totalSupply)} {currency}
        </span>
      </div>
      <input
        className={classes.slider}
        type='range'
        min={Range[currency].min}
        max={Range[currency].max}
        step={Range[currency].step}
        value={totalSupply}
        onChange={onSupplyChange}
      />
      <div className={classes.axis}>
        <p>{cur(Range[currency].min)}</p>
        <p>{cur(Range[currency].max / 2)}</p>
        <p>{cur(Range[currency].max)}</p>
      </div>
      <div className={classes.sliderHeader}>
        <span className={classes.sliderTitle}>Actual Loan</span>
        <span className={classes.value}>
          {cur(actualLoan)} {currency}
        </span>
      </div>
      <input
        disabled={totalSupply === 0}
        className={classes.slider}
        type='range'
        min={MaxLoanRange.min}
        max={MaxLoanRange.max}
        step={MaxLoanRange.step}
        value={actualLoan}
        onChange={onActualLoanChange}
      />
      <div className={classes.axis}>
        <p>{cur(MaxLoanRange.min)}</p>
        <p>{cur(MaxLoanRange.max / 2)}</p>
        <p>{cur(MaxLoanRange.max)}</p>
      </div>
      <p className={classes.sliderInfo}>
        Input your desired collateral type, amount, and utilization to view
        estimated rates, interest, and liquidation prices. (Include radio
        buttons for collateral type, sliders for collateral amount and
        utilization).
      </p>
      <div className={classes.separator} />
      <h3 className={classes.title}>Results</h3>
      <div className={classes.results}>
        <div className={classes.frame}>
          <p>Utilization Factor</p>
          <span>{pct(UtilizationFactor)}</span>
        </div>
        <div className={classes.frame}>
          <p>Total Supply</p>
          <span>
            {cur(totalSupply)} {currency}
          </span>
        </div>
        <div className={classes.frame}>
          <p>Actual Loan</p>
          <span>
            {cur(actualLoan)} {currency}
          </span>
        </div>
        <div className={classes.frame}>
          <p>Collateral Factor</p>
          <span>{pct(CollateralFactor)}</span>
        </div>
        <div className={classes.frame}>
          <p>Total Supply USD</p>
          <span>{cur(totalSupplyUSD)} USD</span>
        </div>
        <div className={classes.frame}>
          <p>Actual Loan USD</p>
          <span>{cur(actualLoanUSD)} USD</span>
        </div>
        <div className={classes.frame}>
          <p>Liquidation Treshold</p>
          <span>{cur(liquidationThreshold)} USD</span>
        </div>
        <div className={classes.frame}>
          <p>{currency} Price</p>
          <span>{Prices[currency]} USD</span>
        </div>
      </div>
    </div>
  );
};
