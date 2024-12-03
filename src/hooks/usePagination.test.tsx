import { renderHook, act } from "@testing-library/react";
import usePagination from "./usePagination";

describe("usePagination Hook", () => {
  const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`); 
  const itemsPerPage = 10;

  test("initial state is correct", () => {
    const { result } = renderHook(() => usePagination(items, itemsPerPage));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(5); 
    expect(result.current.currentPageItems).toEqual(items.slice(0, 10));
  });

  test("goToNextPage updates the current page correctly", () => {
    const { result } = renderHook(() => usePagination(items, itemsPerPage));

    act(() => {
      result.current.goToNextPage();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.currentPageItems).toEqual(items.slice(10, 20));
  });

  test("goToPreviousPage updates the current page correctly", () => {
    const { result } = renderHook(() => usePagination(items, itemsPerPage));

    
    act(() => {
      result.current.setPage(2);
    });

    
    act(() => {
      result.current.goToPreviousPage();
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.currentPageItems).toEqual(items.slice(0, 10));
  });

  test("setPage updates to a specific page", () => {
    const { result } = renderHook(() => usePagination(items, itemsPerPage));

    act(() => {
      result.current.setPage(3);
    });

    expect(result.current.currentPage).toBe(3);
    expect(result.current.currentPageItems).toEqual(items.slice(20, 30));
  });

  test("setPage does not update if page is out of range", () => {
    const { result } = renderHook(() => usePagination(items, itemsPerPage));

    act(() => {
      result.current.setPage(0); // Below range
    });

    expect(result.current.currentPage).toBe(1);

    act(() => {
      result.current.setPage(6); 
    });

    expect(result.current.currentPage).toBe(1);
  });

  test("goToNextPage does not exceed total pages", () => {
    const { result } = renderHook(() => usePagination(items, itemsPerPage));

    act(() => {
      result.current.setPage(5);
    });

    act(() => {
      result.current.goToNextPage();
    });

    expect(result.current.currentPage).toBe(5);
    expect(result.current.currentPageItems).toEqual(items.slice(40, 50));
  });
});
