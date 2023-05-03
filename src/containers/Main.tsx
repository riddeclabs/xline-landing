import React, { useCallback, useEffect, useState, useMemo } from 'react';
import classes from './Main.module.scss';

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
          <fieldset>
            <legend>Select currency:</legend>
            {Object.values(Currencies).map((c) => (
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
              </div>
            ))}
          </fieldset>
        </div>
        <div className={classes.vs} />
        <div className={classes.section}>
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
          >
            <h4>
              Total supply {currency}: {totalSupply}
            </h4>
            <input
              type='range'
              min={Range[currency].min}
              max={Range[currency].max}
              step={Range[currency].step}
              value={totalSupply}
              onChange={onRangeChange}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-around',
              }}
            >
              {new Array(11).fill(0).map((i, index) => (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  key={'n1' + index}
                >
                  <p style={{ fontSize: 10 }}>
                    {((Range[currency].max / 10) * index).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <h4>
              Actual loan {currency}: {actualLoan}
            </h4>
            <input
              type='range'
              min={MaxLoanRange.min}
              max={MaxLoanRange.max}
              step={MaxLoanRange.step}
              value={actualLoan}
              onChange={onActualLoanChange}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-around',
              }}
            >
              {new Array(11).fill(0).map((i, index) =>
                MaxLoanRange.max === 0 ? null : (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    key={'n2' + index}
                  >
                    <p style={{ fontSize: 10 }}>
                      {((MaxLoanRange.max / 10) * index).toFixed(2)}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className={classes.vs} />
        <div className={classes.section}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p>Utilization Factor: {UtilizationFactor * 100}%</p>
            <p>Collateral Factor: {CollateralFactor * 100}%</p>
            <p>Total Supply: {totalSupply}</p>
            <p>Total Supply USD: {totalSupplyUSD}</p>
            <p>Actual Loan: {actualLoan}</p>
            <p>Actual Loan USD: {actualLoanUSD}</p>
            <p>Liquidation Treshold: {liquidationThreshold} USD</p>
            <p>
              {currency} price: {Prices[currency]} USD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
