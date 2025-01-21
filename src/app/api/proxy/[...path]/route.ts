import { getServerSession } from "next-auth";
import { authServerOptions } from "../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

//Proxy for GET calls
export async function GET(
    req: NextRequest,
    { params }: { params: { path: string[] } }
) {
    const resolvedParams = await params;
    //current session
    const session = await getServerSession(authServerOptions);

    //check if we have session, if not throw unauthroized error
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Building the full API URL
    const backendUrl = process.env.BACKEND_URL;
    const apiUrl = `${backendUrl}/${resolvedParams.path.join("/")}`;

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${session.backendTokens.accessToken}`,
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Internal server error",
                details: (error as Error).message,
            },
            { status: 500 }
        );
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: { path: string[] } }
) {
    const resolvedParams = await params;
    let accessToken: string = "";

    //current session
    const session = await getServerSession(authServerOptions);

    //check if we have session, if not throw unauthroized error
    if (session?.backendTokens) {
        accessToken = session.backendTokens.accessToken;
    }

    // Building the full API URL
    const backendUrl = process.env.BACKEND_URL;
    const apiUrl = `${backendUrl}/${resolvedParams.path.join("/")}`;

    const body = await req.json();

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Internal server error",
                details: (error as Error).message,
            },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { path: string[] } }
) {
    const resolvedParams = await params;
    let accessToken: string = "";

    //current session
    const session = await getServerSession(authServerOptions);

    //check if we have session, if not throw unauthroized error
    if (session?.backendTokens) {
        accessToken = session.backendTokens.accessToken;
    }

    // Building the full API URL
    const backendUrl = process.env.BACKEND_URL;
    const apiUrl = `${backendUrl}/${resolvedParams.path.join("/")}`;

    const body = await req.json();

    try {
        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Internal server error",
                details: (error as Error).message,
            },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { path: string[] } }
) {
    const resolvedParams = await params;
    let accessToken: string = "";

    //current session
    const session = await getServerSession(authServerOptions);

    //check if we have session, if not throw unauthroized error
    if (session?.backendTokens) {
        accessToken = session.backendTokens.accessToken;
    }

    // Building the full API URL
    const backendUrl = process.env.BACKEND_URL;
    const apiUrl = `${backendUrl}/${resolvedParams.path.join("/")}`;

    const body = await req.json();

    try {
        const response = await fetch(apiUrl, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Internal server error",
                details: (error as Error).message,
            },
            { status: 500 }
        );
    }
}
