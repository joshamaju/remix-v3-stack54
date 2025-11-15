import type { RouteHandlers } from "@remix-run/fetch-router";
import { redirect } from "@remix-run/fetch-router/response-helpers";

import { routes } from "../routes";
import { loadAuth } from "./middleware/auth";
import {
  authenticateUser,
  createPasswordResetToken,
  createUser,
  getUserByEmail,
  resetPassword,
} from "./models/users";
import { render } from "./utils/render";
import { getSession, login, logout, setSessionCookie } from "./utils/session";

export default {
  middleware: [loadAuth],
  handlers: {
    login: {
      index() {
        return render("login/index");
      },

      async action({ request, formData }) {
        let email = formData.get("email")?.toString() ?? "";
        let password = formData.get("password")?.toString() ?? "";
        let user = authenticateUser(email, password);

        if (!user) {
          return render("login/action", {}, { status: 401 });
        }

        let session = getSession(request);
        login(session.sessionId, user);

        let headers = new Headers();
        setSessionCookie(headers, session.sessionId);

        return redirect(routes.account.index.href(), { headers });
      },
    },

    register: {
      index() {
        return render("register/index");
      },

      async action({ request, formData }) {
        let name = formData.get("name")?.toString() ?? "";
        let email = formData.get("email")?.toString() ?? "";
        let password = formData.get("password")?.toString() ?? "";

        // Check if user already exists
        if (getUserByEmail(email)) {
          return render("register/action", {}, { status: 400 });
        }

        let user = createUser(email, password, name);

        let session = getSession(request);
        login(session.sessionId, user);

        let headers = new Headers();
        setSessionCookie(headers, session.sessionId);

        return redirect(routes.account.index.href(), { headers });
      },
    },

    logout({ request }) {
      let session = getSession(request);
      logout(session.sessionId);

      return redirect(routes.home.href());
    },

    forgotPassword: {
      index() {
        return render("forgot-password/index");
      },

      async action({ formData }) {
        let email = formData.get("email")?.toString() ?? "";
        let token = createPasswordResetToken(email);
        return render("forgot-password/action", { token });
      },
    },

    resetPassword: {
      index({ params }) {
        let token = params.token;
        return render("reset-password/index", { token });
      },

      async action({ formData, params }) {
        let password = formData.get("password")?.toString() ?? "";
        let confirmPassword = formData.get("confirmPassword")?.toString() ?? "";

        if (password !== confirmPassword) {
          return render(
            "reset-password/action",
            { type: "credentials" },
            { status: 400 }
          );
        }

        const token = params.token;

        let success = resetPassword(token, password);

        if (!success) {
          return render(
            "reset-password/action",
            { type: "failure", token },
            { status: 400 }
          );
        }

        return render("reset-password/action", { type: "success", token });
      },
    },
  },
} satisfies RouteHandlers<typeof routes.auth>;
