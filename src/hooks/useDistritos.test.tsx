import { render, waitFor } from "@testing-library/react";
import { useDistritos } from "./useDistritos";


global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        distritos: [
          { id: 1, nombre: "VillaMaria" },
          { id: 2, nombre: "Lima" },
          { id: 3, nombre: "Pachacamac" },
        ],
      }),
  })
) as jest.Mock;


const TestComponent = () => {
  const { distritos, loading } = useDistritos();
  return (
    <div>
      <p data-testid="loading">{loading ? "true" : "false"}</p>
      <ul data-testid="distritos">
        {distritos.map((distrito) => (
          <li key={distrito.id}>{distrito.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

describe("useDistritos", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetches distritos and updates state", async () => {
    const { getByTestId } = render(<TestComponent />);

  
    expect(getByTestId("loading").textContent).toBe("true");
    expect(getByTestId("distritos").children.length).toBe(0);

    
    await waitFor(() => expect(getByTestId("loading").textContent).toBe("false"));

    
    expect(getByTestId("distritos").children.length).toBe(3);
    expect(getByTestId("distritos").textContent).toContain("VillaMaria");
    expect(getByTestId("distritos").textContent).toContain("Lima");
    expect(getByTestId("distritos").textContent).toContain("Pachacamac");
  });
});
