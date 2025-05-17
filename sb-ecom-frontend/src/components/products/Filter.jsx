import React, { useEffect, useState} from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter = ({categories}) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    const [category, setCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    // Initialize state from URL parameters
    useEffect(() => {
        const currentCategory = searchParams.get("category") || "all";
        const currentSortOrder = searchParams.get("sortby") || "asc";
        const currentSearchTerm = searchParams.get("keyword") || "";

        setCategory(currentCategory);
        setSortOrder(currentSortOrder);
        setSearchTerm(currentSearchTerm);
    }, [searchParams]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if(searchTerm){
                searchParams.set("keyword",searchTerm);
            }else{
                searchParams.delete("keyword");
            }
             navigate(`${pathname}?${searchParams.toString()}`);
        },700);

        return () => {
            clearTimeout(handler);
        }
    },[searchParams,searchTerm,navigate,pathname]);

    // Function to update URL parameters (not directly used for category/sort now)
    // const updateURLParams = useCallback(
    //     (newParams) => {
    //         setSearchParams(newParams, { replace: true });
    //     },
    //     [setSearchParams]
    // );

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);

        if (selectedCategory === "all") {
            params.delete("category");
        } else {
            params.set("category", selectedCategory);
        }
        navigate(`${pathname}?${params.toString()}`);
    };

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => {
            const newOrder = prevOrder === "asc" ? "desc" : "asc";
            params.set("sortby",newOrder);
            navigate(`${pathname}?${params.toString()}`);
            return newOrder;
        });
    };

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleClearFilters = () => {
        navigate({pathname : window.location.pathname});
        // setCategory("all");
        // setSearchTerm("");
        // setSortOrder("asc");
        // updateURLParams({});
    };

    return (
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4 w-full">
            {/* Search Input */}
            <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
                <input
                    type="text"
                    placeholder="Search Products"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
                />
                <FiSearch className="absolute left-3 text-slate-800" size={20} />
            </div>

            {/* Filter Controls */}
            <div className="flex items-center gap-x-4">
                {/* Category Dropdown */}
                <select
                    value={category}
                    onChange={handleCategoryChange}
                    className="border border-gray-400 text-slate-800 rounded-md px-4 py-2 w-[150px] h-[40px] focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
                >
                    <option value="all">All</option>
                    {categories.map((c) => (
                        <option key={c.categoryId} value={c.categoryName}>
                            {c.categoryName}
                        </option>
                    ))}
                </select>

                {/* Sort Button */}
                <button
                    onClick={toggleSortOrder}
                    className="bg-[#1976d2] text-white px-4 py-2 w-[150px] h-[40px] rounded-md hover:bg-[#155fa0] transition duration-200 flex items-center justify-center gap-2"
                >
                    <span>Sort By</span>
                    {sortOrder === "asc" ? (
                        <FiArrowUp size={20} />
                    ) : (
                        <FiArrowDown size={20} />
                    )}
                </button>

                {/* Clear Filter Button */}
                <button
                    onClick={handleClearFilters}
                    className="flex items-center justify-center gap-2 bg-rose-900 text-white px-3 py-2 w-[150px] h-[40px] rounded-md transition duration-300 ease-in shadow-md focus:outline-none"
                >
                    <FiRefreshCw size={16} />
                    <span>Clear Filter</span>
                </button>
            </div>
        </div>
    );
};

export default Filter;