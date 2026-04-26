import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#8b1e1e', '#2f4a32', '#b8893a', '#3d4a5a', '#5a2d4a', '#b85c3a', '#8a7560'];

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
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 16, right: 8, left: -8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="0" vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: '#1a1612' }}
              dy={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={64}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              cursor={{ fill: 'rgba(26,22,18,0.05)' }}
              formatter={(value) => [`$${value.toLocaleString()}`, 'spent']}
              contentStyle={{
                background: '#f3ede1',
                border: '1px solid #1a1612',
                borderRadius: 0,
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                padding: '10px 14px',
                boxShadow: '4px 4px 0 rgba(26,22,18,0.08)',
              }}
              labelStyle={{ color: '#1a1612', fontWeight: 600, marginBottom: 4 }}
              itemStyle={{ color: '#8b1e1e', padding: 0 }}
            />
            <Bar dataKey="value" maxBarSize={64}>
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
