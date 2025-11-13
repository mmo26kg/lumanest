import { Loading } from "@/components/ui/loading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold text-foreground">Creative Loading Animations</h1>
                    <p className="text-muted-foreground">Beautiful, innovative loading indicators with advanced animations</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Spinner</CardTitle>
                            <CardDescription>Classic circular spinner</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center py-8">
                            <Loading variant="spinner" size="lg" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Bouncing Dots</CardTitle>
                            <CardDescription>Playful bounce animation</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center py-8">
                            <Loading variant="dots" size="lg" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Pulse</CardTitle>
                            <CardDescription>Smooth pulsing circle</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center py-8">
                            <Loading variant="pulse" size="lg" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Bars</CardTitle>
                            <CardDescription>Animated vertical bars</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center py-8">
                            <Loading variant="bars" size="lg" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Wave</CardTitle>
                            <CardDescription>Rhythmic wave motion</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center py-8">
                            <Loading variant="wave" size="lg" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Orbit</CardTitle>
                            <CardDescription>Planetary orbit effect</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center py-8">
                            <Loading variant="orbit" size="lg" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Flip</CardTitle>
                            <CardDescription>3D flip animation</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center py-8">
                            <Loading variant="flip" size="lg" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Morph</CardTitle>
                            <CardDescription>Shape-shifting animation</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center py-8">
                            <Loading variant="morph" size="lg" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Glow</CardTitle>
                            <CardDescription>Glowing pulse effect</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center py-8">
                            <Loading variant="glow" size="lg" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Ripple</CardTitle>
                            <CardDescription>Expanding ripple waves</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center py-8">
                            <Loading variant="ripple" size="lg" />
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>With Custom Text</CardTitle>
                            <CardDescription>All variants support text labels</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                            <Loading variant="orbit" size="md" text="Loading..." />
                            <Loading variant="wave" size="md" text="Processing" />
                            <Loading variant="glow" size="md" text="Please wait" />
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2 lg:col-span-3">
                        <CardHeader>
                            <CardTitle>Size Variations</CardTitle>
                            <CardDescription>Choose from sm, md, lg, and xl sizes</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-end justify-around gap-4 py-8">
                            <div className="text-center space-y-2">
                                <Loading variant="morph" size="sm" />
                                <p className="text-xs text-muted-foreground">Small</p>
                            </div>
                            <div className="text-center space-y-2">
                                <Loading variant="morph" size="md" />
                                <p className="text-xs text-muted-foreground">Medium</p>
                            </div>
                            <div className="text-center space-y-2">
                                <Loading variant="morph" size="lg" />
                                <p className="text-xs text-muted-foreground">Large</p>
                            </div>
                            <div className="text-center space-y-2">
                                <Loading variant="morph" size="xl" />
                                <p className="text-xs text-muted-foreground">Extra Large</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Index;
