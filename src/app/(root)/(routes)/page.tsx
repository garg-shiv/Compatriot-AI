import React from "react";
import SearchInput from "../../../components/ui/search-input";
import prismadb from "@/lib/prismadb";
import { Categories } from "@/components/categories";
import { Companions } from "@/components/companions";

interface RootPageProps {
    searchParams: {
        categoryId?: string;
        name?: string;
    };
}

const RootPage = async ({ searchParams }: RootPageProps) => {
    const categoryId =  searchParams?.categoryId || "";
    const name =  searchParams?.name || "";

    const data = await prismadb.companion.findMany({
        where: {
            categoryId: categoryId || undefined,
            name: name ? { search: name } : undefined
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            _count: {
                select: {
                    messages: true
                }
            }
        }
    });

    const categories = await prismadb.category.findMany();

    return (
        <div className="h-full p-4 space-y-2">
            <SearchInput />
            <Categories data={categories} />
            <Companions data={data} />
        </div>
    );
};

export default RootPage;
