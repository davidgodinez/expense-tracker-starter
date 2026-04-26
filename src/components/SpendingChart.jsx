import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#e63329', '#2747e8', '#f5c518', '#111111', '#e63329', '#2747e8', '#f5c518'];

function SpendingChart({ transactions }) {
  const totalsByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(totalsByCategory).map(([name, value]) => ({ name, value }));

  return (
    <div className="chart">
      <h2>Spending by category</h2>
      {data.length === 0 ? (
        <p className="chart-empty">— no expenses recorded —</p>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} margin={{ top: 16, right: 8, left: -8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="0" vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: '#111111', strokeWidth: 2 }}
              dy={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={64}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              cursor={{ fill: 'rgba(245, 197, 24, 0.25)' }}
              formatter={(value) => [`$${value.toLocaleString()}`, 'spent']}
              contentStyle={{
                background: '#ffffff',
                border: '3px solid #111111',
                borderRadius: 0,
                fontFamily: 'DM Mono, monospace',
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                padding: '10px 14px',
              }}
              labelStyle={{ color: '#111111', fontWeight: 700, marginBottom: 4 }}
              itemStyle={{ color: '#e63329', padding: 0, fontWeight: 600 }}
            />
            <Bar dataKey="value" maxBarSize={72}>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingChart;
