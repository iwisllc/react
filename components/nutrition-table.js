export const NutritionTable = ({ sticker }) => (
  <table className="table table-auto p-4 bg-transparent">
    <thead>
    <tr className="text-lg">
      <th colSpan="2" className="border p-4 border-black whitespace-nowrap text-base text-gray-900">
        ПОЖИВНА ЦІННІСТЬ
      </th>
      <th className="border border-black whitespace-nowrap text-base text-gray-900">
        на 100 г
      </th>
    </tr>
    </thead>
    <tbody>
    {
      sticker.calories
        ? <tr className="text-lg leading-relaxed">
          <td className="border p-4 border-black">Енергетична цінність</td>
          <td className="border p-4 border-black">Ккал</td>
          <td className="border p-4 border-black"><b>{sticker.calories}</b></td>
        </tr>
        : null
    }
    {
      sticker.protein
        ? <tr className="text-lg leading-relaxed">
          <td className="border p-4 border-black">Білки</td>
          <td className="border p-4 border-black">г</td>
          <td className="border p-4 border-black"><b>{sticker.protein}</b></td>
        </tr>
        : null
    }
    {
      sticker.fat
        ? <tr className="text-lg leading-relaxed">
          <td className="border p-4 border-black">Жири</td>
          <td className="border p-4 border-black">г</td>
          <td className="border p-4 border-black"><b>{sticker.fat}</b></td>
        </tr>
        : null
    }
    {
      sticker.carb
        ? <tr className="text-lg leading-relaxed">
          <td className="border p-4 border-black">Вуглеводи</td>
          <td className="border p-4 border-black">г</td>
          <td className="border p-4 border-black"><b>{sticker.carb}</b></td>
        </tr>
        : null
    }
    </tbody>
  </table>
)
