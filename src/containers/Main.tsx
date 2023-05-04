import React, { useCallback, useEffect, useState, useMemo } from 'react';
import classes from './Main.module.scss';
import { BTCIcon, ETHIcon } from '../assets';
import { pct, cur } from '../helpers';
enum Currencies {
  BTC = 'BTC',
  ETH = 'ETH',
}
const Icons = {
  [Currencies.BTC]: BTCIcon,
  [Currencies.ETH]: ETHIcon,
};

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

export const MainContainer: React.FC = () => {
  const [currency, setCurrecny] = useState(Currencies.ETH);
  const [totalSupply, setTotalSupply] = useState(0);
  const [totalSupplyUSD, setTotalSupplyUSD] = useState(0);
  const [actualLoan, setActualLoan] = useState(0);
  const [actualLoanUSD, setActualLoanUSD] = useState(0);

  useEffect(() => {
    if (totalSupply) {
      setTotalSupplyUSD(totalSupply * Prices[currency]);
    } else {
      setTotalSupplyUSD(0);
    }
  }, [totalSupply, currency]);

  useEffect(() => {
    if (actualLoan) {
      setActualLoanUSD(actualLoan * Prices[currency]);
    } else {
      setActualLoanUSD(0);
    }
  }, [actualLoan, currency]);

  const onCurrencyChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrecny(e.target.value as Currencies);
      setTotalSupply(0);
      setActualLoan(0);
    },
    []
  );
  const onRangeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTotalSupply(Number(e.target.value));
      setActualLoan(0);
    },
    []
  );
  const onActualLoanChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setActualLoan(Number(e.target.value));
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

  const liquidationThreshold = useMemo(() => {
    if (actualLoanUSD && totalSupply) {
      return actualLoanUSD / UtilizationFactor / totalSupply;
    }
    return 0;
  }, [currency, actualLoanUSD, totalSupply]);
  return (
    <div className={classes.main}>
      <h1 className={classes.title}>Loans up to 50K USD</h1>
      <hr className={classes.separator} />
      <p className={classes.subtitle}>
        Shovelnose sturgeon platy flathead angler catfish? Upside-down catfish
        golden shiner cobbler canary rockfish Old World rivuline footballfish;
      </p>
      <div className={classes.content}>
        <div className={classes.section}>
          <h3 className={classes.title}>Select currency</h3>
          <fieldset className={classes.currencyFieldset}>
            {Object.values(Currencies).map((c) => {
              const Icon = Icons[c];
              return (
                <div key={c}>
                  <input
                    type='radio'
                    id={c}
                    name={c}
                    value={c}
                    onChange={onCurrencyChange}
                    checked={c === currency}
                  />
                  <label htmlFor={c}>{c}</label>
                  <Icon width={20} height={20} />
                </div>
              );
            })}
          </fieldset>
        </div>
        <div className={classes.vs} />
        <div className={classes.section}>
          <h3 className={classes.title}>Select supply</h3>
          <div className={classes.sliders}>
            <h4>
              Total supply: {cur(totalSupply)} {currency}
            </h4>
            <input
              type='range'
              min={Range[currency].min}
              max={Range[currency].max}
              step={Range[currency].step}
              value={totalSupply}
              onChange={onRangeChange}
            />
            <div className={classes.axis}>
              <p>{cur(Range[currency].min)}</p>
              <p>{cur(Range[currency].max / 2)}</p>
              <p>{cur(Range[currency].max)}</p>
            </div>
            <h4>
              Actual loan: {cur(actualLoan)} {currency}
            </h4>
            <input
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
          </div>
        </div>
        <div className={classes.vs} />
        <div className={classes.section}>
          <h3 className={classes.title}>Apply results</h3>
          <div className={classes.results}>
            <p className={classes.value}>
              <span className={classes.title}>Utilization Factor:</span>{' '}
              {pct(UtilizationFactor)}
            </p>
            <p className={classes.value}>
              <span className={classes.title}>Collateral Factor:</span>{' '}
              {pct(CollateralFactor)}
            </p>
            <p className={classes.value}>
              <span className={classes.title}>Total Supply:</span>{' '}
              {cur(totalSupply)} {currency}
            </p>
            <p className={classes.value}>
              <span className={classes.title}>Total Supply USD:</span>{' '}
              {cur(totalSupplyUSD)} USD
            </p>
            <p className={classes.value}>
              <span className={classes.title}>Actual Loan:</span>{' '}
              {cur(actualLoan)} {currency}
            </p>
            <p className={classes.value}>
              <span className={classes.title}>Actual Loan USD:</span>{' '}
              {cur(actualLoanUSD)} USD
            </p>
            <p className={classes.value}>
              <span className={classes.title}>Liquidation Treshold:</span>{' '}
              {cur(liquidationThreshold)} USD
            </p>
            <p className={classes.value}>
              <span className={classes.title}>{currency} price:</span>{' '}
              {cur(Prices[currency])} USD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
