import  { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCoinDetails } from "../service/fetchCoinDetails";
import { useQuery } from "@tanstack/react-query";

const CoinDetailsPage = () => {
  const { coinId } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["coin", coinId],
    queryFn: () => fetchCoinDetails(coinId),
  });

  const coin = data;
  const [showFullDesc, setShowFullDesc] = useState(false);

  const name = coin?.name ?? "";
  const symbol = coin?.symbol?.toUpperCase?.() ?? "";
  const image = coin?.image?.large || coin?.image?.small || coin?.image?.thumb;
  const rank = coin?.market_cap_rank ?? coin?.market_data?.market_cap_rank;
  const hashing = coin?.hashing_algorithm ?? "—";
  const genesis = coin?.genesis_date ?? "—";
  const categories = coin?.categories || [];

  const currentPriceUSD =
    coin?.market_data?.current_price?.usd ?? coin?.current_price?.usd ?? null;
  const high24USD =
    coin?.market_data?.high_24h?.usd ?? coin?.high_24h?.usd ?? null;
  const low24USD =
    coin?.market_data?.low_24h?.usd ?? coin?.low_24h?.usd ?? null;
  const marketCapUSD =
    coin?.market_data?.market_cap?.usd ?? coin?.market_cap?.usd ?? null;
  const priceChangePct24h =
    coin?.market_data?.price_change_percentage_24h ??
    coin?.price_change_percentage_24h ??
    null;
  const circSupply =
    coin?.circulating_supply ?? coin?.market_data?.circulating_supply;
  const maxSupply = coin?.max_supply ?? coin?.market_data?.max_supply;

  const tickers = useMemo(
    () => (Array.isArray(coin?.tickers) ? coin.tickers.slice(0, 10) : []),
    [coin]
  );

  const descriptionEN = coin?.description?.en || coin?.description || "";
  const shortDesc = useMemo(
    () =>
      descriptionEN?.length > 400
        ? descriptionEN.slice(0, 400) + "…"
        : descriptionEN,
    [descriptionEN]
  );

  useEffect(() => {
    console.log(data);
  }, [coinId, data]);

  if (isLoading) {
    return <div>downloading coin details...</div>;
  }
  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100 p-6 md:p-10">
      {/* Container */}
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-slate-800/40 rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="flex items-center gap-4">
            {image && (
              <img
                src={image}
                alt={`${name} logo`}
                className="w-16 h-16 rounded-full shadow-md"
              />
            )}
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                {name}{" "}
                <span className="text-slate-300 text-lg">({symbol})</span>
              </h1>
              <div className="mt-2 flex flex-wrap gap-2 items-center text-sm">
                {typeof rank === "number" && (
                  <span className="bg-slate-700/60 px-3 py-1 rounded-full text-slate-200 font-semibold">
                    Rank #{rank}
                  </span>
                )}
                <span className="bg-slate-700/40 px-3 py-1 rounded-full">
                  Algo: {hashing}
                </span>
                <span className="bg-slate-700/40 px-3 py-1 rounded-full">
                  Since: {formatDate(genesis)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="text-slate-300 text-sm">Current Price</div>
            <div className="flex items-baseline gap-3">
              <div className="text-3xl md:text-4xl font-extrabold">
                {currentPriceUSD != null
                  ? formatCurrency(currentPriceUSD)
                  : "—"}
              </div>
              {priceChangePct24h != null && (
                <div
                  className={`px-3 py-1 rounded-lg font-semibold ${
                    priceChangePct24h >= 0
                      ? "bg-emerald-900/50 text-emerald-300"
                      : "bg-rose-900/50 text-rose-300"
                  }`}
                >
                  {formatPercent(priceChangePct24h)}
                </div>
              )}
            </div>
            <div className="text-sm text-slate-400 mt-1">
              {marketCapUSD != null
                ? `${formatCurrency(marketCapUSD)} Market Cap`
                : ""}
            </div>
          </div>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mt-6">
            <div className="flex gap-2 flex-wrap">
              {categories.map((c) => (
                <span
                  key={c}
                  className="text-xs md:text-sm bg-slate-700/40 px-3 py-1 rounded-full"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
          <Stat
            label="Market Cap"
            value={marketCapUSD != null ? formatCurrency(marketCapUSD) : "—"}
          />
          <Stat
            label="24h High"
            value={high24USD != null ? formatCurrency(high24USD) : "—"}
          />
          <Stat
            label="24h Low"
            value={low24USD != null ? formatCurrency(low24USD) : "—"}
          />
          <Stat
            label="Circulating Supply"
            value={circSupply != null ? formatNumber(circSupply) : "—"}
          />
          <Stat
            label="Max Supply"
            value={maxSupply != null ? formatNumber(maxSupply) : "—"}
          />
          <Stat
            label="Upvotes"
            value={
              coin?.sentiment_votes_up_percentage != null
                ? `${coin.sentiment_votes_up_percentage}%`
                : "—"
            }
          />
        </div>

        {/* Description */}
        {descriptionEN && (
          <div className="mt-8 bg-slate-800/30 p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-3">About {name}</h2>
            <p
              className="text-sm text-slate-200 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: (showFullDesc ? descriptionEN : shortDesc).replace(
                  /\n/g,
                  "<br/>"
                ),
              }}
            />
            {descriptionEN.length > 400 && (
              <button
                className="mt-3 text-sky-400 font-semibold"
                onClick={() => setShowFullDesc((v) => !v)}
              >
                {showFullDesc ? "Show less" : "Read more"}
              </button>
            )}
          </div>
        )}

        {/* Top markets / tickers */}
        {tickers.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-3">Top Markets</h3>
            <div className="overflow-x-auto bg-slate-800/30 rounded-xl">
              <table className="min-w-full table-auto">
                <thead className="bg-slate-900/40 sticky top-0">
                  <tr className="text-left text-slate-300 text-sm">
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Exchange</th>
                    <th className="px-4 py-3">Pair</th>
                    <th className="px-4 py-3 text-right">Last Price</th>
                    <th className="px-4 py-3 text-right">Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {tickers.map((t, i) => (
                    <tr
                      key={`${t.market?.name}-${i}`}
                      className="border-t border-slate-800/60 hover:bg-slate-800/20"
                    >
                      <td className="px-4 py-3 text-sm text-slate-200">
                        {i + 1}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {t?.market?.name ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {(t?.base ?? "—") + "/" + (t?.target ?? "—")}
                      </td>
                      <td className="px-4 py-3 text-sm text-right">
                        {t?.last != null ? formatNumber(t.last) : "—"}
                      </td>
                      <td className="px-4 py-3 text-sm text-right">
                        {t?.volume != null ? formatNumber(t.volume) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Links */}
        <div className="mt-8 flex flex-wrap gap-3">
          {Array.isArray(coin?.links?.homepage) && coin.links.homepage[0] && (
            <a
              href={coin.links.homepage[0]}
              target="_blank"
              rel="noreferrer"
              className="text-sky-400 font-medium"
            >
              Website ↗
            </a>
          )}
          {coin?.links?.whitepaper && (
            <a
              href={coin.links.whitepaper}
              target="_blank"
              rel="noreferrer"
              className="text-sky-400 font-medium"
            >
              Whitepaper ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinDetailsPage;

function Stat({ label, value }) {
  return (
    <div className="bg-slate-800/40 p-4 rounded-xl shadow-inner">
      <div className="text-xs text-slate-300 uppercase font-semibold">
        {label}
      </div>
      <div className="mt-2 font-extrabold text-sm md:text-base">{value}</div>
    </div>
  );
}

// ---------- Helpers ----------
function formatCurrency(n, currency = "USD") {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(n);
  } catch (e) {
    return `$${formatNumber(n)}`;
  }
}
function formatNumber(n) {
  if (n == null) return "—";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(n);
}
function formatPercent(n) {
  const sign = n > 0 ? "+" : "";
  return `${sign}${Number(n).toFixed(2)}%`;
}
function formatDate(d) {
  if (!d) return "—";
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return d;
  return dt.toLocaleDateString();
}
