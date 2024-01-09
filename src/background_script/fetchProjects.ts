export interface Currency {
    id: number
    code: string
    sign: string
    name: string
    exchange_rate: number
    country: string
    is_external: boolean
    is_escrowcom_supported: boolean
}

export interface Budget {
    minimum: number
    maximum?: number
    name: any
    project_type: any
    currency_id: any
}

export interface BidStats {
    bid_count: number
    bid_avg: number
}

export interface FreelancerProject {
    id: number
    owner_id: number
    title: string
    status: string
    sub_status: any
    seo_url: string
    currency: Currency
    description: string
    submitdate: number
    preview_description: string
    deleted: boolean
    nonpublic: boolean
    hidebids: boolean
    type: 'hourly' | 'fixed'
    bidperiod: number
    budget: Budget
    featured: boolean
    urgent: boolean
    assisted: boolean
    bid_stats: BidStats
    time_submitted: number
    time_updated: number
    qualifications: any
    language: string
    attachments: any
    hireme: boolean
    hireme_initial_bid: any
    invited_freelancers: any
    recommended_freelancers: any
    frontend_project_status: string
    nda_signatures: any
    location: Location
    local: boolean
    negotiated: boolean
    negotiated_bid: any
    time_free_bids_expire: number
    can_post_review: any
    files: any
    user_distance: any
    from_user_location: any
    project_collaborations: any
    support_sessions: any
    track_ids: any
    drive_files: any
    nda_details: any
    pool_ids: string[]
    enterprise_ids: any[]
    timeframe: any
    deloitte_details: any
    is_escrow_project: boolean
    is_seller_kyc_required: boolean
    is_buyer_kyc_required: boolean
    equipment: any
    nda_signatures_new: any
    billing_code: any
    enterprises: any[]
    enterprise_metadata_values: any
    repost_id: any
    client_engagement: any
    contract_signatures: any
    quotation_id: any
    quotation_version_id: any
    enterprise_linked_projects_details: any
    equipment_groups: any
    project_source: any
    project_source_reference: any
    quality_details: any
    previous_recruiter_project_details: any
    project_note: any
    is_quotation_project: any
    quotation_initial_bid: any
    requires_upfront_funding: any
    group_ids: any[]
}

export interface FreelancerProjectResponseResult {
    projects: FreelancerProject[]
}

export type FreelancerProjectResponse = {
    status: string
    result: FreelancerProjectResponseResult
    request_id: string
}

export type Project = {
    id: string;
	title: string;
	description: string;
	budget: {
		min: number;
		max: number;
		currency: string;
		isHourly: boolean;
	};
	timestamp: number;
	platform: string;
    url: string;
};

export const fetchFreelancerProjects = async () => {

    var myHeaders = new Headers();
    myHeaders.append("freelancer-oauth-v1", process.env.FREELANCER_TOKEN as string);

    const url = "https://www.freelancer.com/api/projects/0.1/projects/active/?jobs[]=3&jobs[]=4&jobs[]=6&jobs[]=7&jobs[]=9&jobs[]=13&jobs[]=15&jobs[]=25&jobs[]=30&jobs[]=31&jobs[]=33&jobs[]=38&jobs[]=59&jobs[]=66&jobs[]=69&jobs[]=72&jobs[]=73&jobs[]=89&jobs[]=95&jobs[]=106&jobs[]=113&jobs[]=116&jobs[]=167&jobs[]=208&jobs[]=215&jobs[]=219&jobs[]=224&jobs[]=237&jobs[]=270&jobs[]=279&jobs[]=301&jobs[]=305&jobs[]=319&jobs[]=320&jobs[]=336&jobs[]=414&jobs[]=427&jobs[]=447&jobs[]=472&jobs[]=500&jobs[]=502&jobs[]=506&jobs[]=564&jobs[]=566&jobs[]=568&jobs[]=598&jobs[]=607&jobs[]=613&jobs[]=616&jobs[]=619&jobs[]=669&jobs[]=673&jobs[]=683&jobs[]=690&jobs[]=709&jobs[]=711&jobs[]=715&jobs[]=727&jobs[]=728&jobs[]=759&jobs[]=873&jobs[]=913&jobs[]=916&jobs[]=923&jobs[]=979&jobs[]=1002&jobs[]=1019&jobs[]=1041&jobs[]=1075&jobs[]=1087&jobs[]=1092&jobs[]=1103&jobs[]=1240&jobs[]=1314&jobs[]=1315&jobs[]=1365&jobs[]=1610&jobs[]=1658&jobs[]=1659&jobs[]=1669&jobs[]=1678&jobs[]=1689&jobs[]=1935&jobs[]=2044&jobs[]=2158&jobs[]=2165&jobs[]=2205&jobs[]=2307&jobs[]=2376&jobs[]=2407&jobs[]=2502&jobs[]=2579&jobs[]=2620&jobs[]=2640&jobs[]=2713&jobs[]=2791&limit=100&offset=0&full_description=true&job_details=true&local_details=true&location_details=true&upgrade_details=true&user_country_details=true&user_details=true&user_employer_reputation=true&sort_field=time_updated"

    const response = await fetch(url, {
        method: 'GET',
        headers: myHeaders,
        redirect: "follow",
    }).then(response => response.json())

    return (response as FreelancerProjectResponse).result.projects
}