

export type User = {
    mobile: string | undefined;
    userLid: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
};

export type UserSessionData = {
    user_detail: {
        email: string;
        first_name: string;
        last_name: string;
        mobile: string;
        role: string;
        user_lid: number;
        username: string;
    };
    accessible_urls:
        | {
                url: string;
                icon: string;
                label: string;
                module: null;
                child: never[];
          }
        | {
                url: string;
                icon: string;
                label: string;
                module: string;
                child: {
                    url: string;
                    icon: string;
                    label: string;
                    module: string;
                    child: never[];
                }[];
          };
};
