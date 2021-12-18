type Props = {
  results: Array<Record<string, string | number>>;
};

export const ResultTable = ({ results = [] }: Props) => {
  return (
    <table className="table-auto w-full border-collapse bg-white rounded-md overflow-hidden border border-gray-300">
      <tbody>
        {results.map((result, rowIndex) => {
          const values = Object.values(result);
          return (
            <tr key={`row_${rowIndex}`}>
              {values.map((value, cellIndex) => {
                return (
                  <td
                    className="border border-gray-300 p-2"
                    key={`cell_${rowIndex}_${cellIndex}`}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
