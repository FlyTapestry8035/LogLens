import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { supabase } from "./supabase";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      if (!profile?.id) return false;

      const { error } = await supabase.from("users").upsert(
        {
          github_id: String(profile.id),
          email: user.email || "",
          name: user.name || profile.login as string || null,
          avatar_url: user.image || null,
        },
        { onConflict: "github_id" }
      );

      if (error) {
        console.error("Error upserting user:", error);
        return false;
      }

      return true;
    },
    async jwt({ token, profile }) {
      if (profile?.id) {
        token.githubId = String(profile.id);
      }
      return token;
    },
    async session({ session, token }) {
      if (token.githubId) {
        const { data } = await supabase
          .from("users")
          .select("id")
          .eq("github_id", token.githubId as string)
          .single();

        if (data) {
          session.user.id = data.id;
        }
      }
      return session;
    },
  },
});
