function applyTone(tone) {
    const emailBody = document.getElementById('emailBodyInput');
    const emailSubject = document.getElementById('emailSubjectInput');
    const linkedinInmail = document.getElementById('linkedinInmailInput');
    const callOpener = document.getElementById('callOpenerText');
    const voicemail = document.getElementById('voicemailText');

    let co = 'Target Account';
    let contact = 'Prospect';
    if (window.currentAccountData && window.currentAccountData.company) {
        co = window.currentAccountData.company;
    }
    if (window.currentDraftData && window.currentDraftData.to && window.currentDraftData.to.name) {
        contact = window.currentDraftData.to.name.split(' ')[0];
    }

    if (tone === 'executive') {
        if (emailSubject) emailSubject.value = `ROI Analysis: Decarbonization & Supplier Consolidation for ${co}`;
        if (emailBody) emailBody.value = `Hi ${contact},\n\nExecutives at your scale are consolidating supply chains to drive hard ROI. Generic broker markups cost you margin, and overseas shipping inflates your Scope-3 carbon footprint.\n\nBy migrating your promotional supply chain to direct USA manufacturing, ${co} can recognize a 30% reduction in unit cost while improving employee retention through premium, high-utility assets (95%+ keep rate).\n\nAre you open to reviewing a localized ROI analysis next week?`;
        if (linkedinInmail) linkedinInmail.value = `Hi ${contact}, reviewing ${co}'s growth. I have a brief ROI framework on optimizing your vendor supply chain & reducing Scope-3 emissions. Open to a brief connection?`;
        if (callOpener) callOpener.textContent = `"${contact}, Travis here. I'm calling about the financial inefficiency in your current vendor supply chain..."`;
        if (voicemail) voicemail.value = `Hi ${contact}, Travis calling. I'm leaving a brief message regarding a vendor consolidation model that improves margin and reduces carbon footprint for ${co}. I'll send an email with the executive summary.`;
    } else if (tone === 'challenger') {
        if (emailSubject) emailSubject.value = `Trap Question: How much of ${co}'s swag goes in the trash?`;
        if (emailBody) emailBody.value = `Hi ${contact},\n\nFrankly, most corporate swag is a waste of budget. 90% of generic catalog items (pens, stress balls) end up in the landfill within weeks.\n\nWhy continue paying steep broker markups for items that actively harm your brand perception?\n\nWe manufacture custom-knit apparel directly in the USA. It's premium, kept by 95% of recipients, and costs less because there's no middleman.\n\nWhen was the last time you audited the retention rate of your promotional spend?`;
        if (linkedinInmail) linkedinInmail.value = `Hi ${contact}, bold question: how much of ${co}'s event budget is wasted on disposable swag that ends up in the trash? We fix this. Let's connect.`;
        if (callOpener) callOpener.textContent = `"${contact}? Travis. Quick question—how much of your event swag actually makes it home with attendees?"`;
        if (voicemail) voicemail.value = `Hi ${contact}, Travis here. Reaching out because most companies waste their budget on swag that gets thrown away. We manufacture premium knit goods that people actually keep. I'll follow up via email.`;
    } else if (tone === 'short') {
        if (emailSubject) emailSubject.value = `Quick custom mockup for ${co}`;
        if (emailBody) emailBody.value = `Hi ${contact},\n\nMost event swag gets thrown away. We make custom-knit socks in the USA that people actually keep (95% retention).\n\nMind if our design team sends you a free digital proof of what this could look like for ${co}?`;
        if (linkedinInmail) linkedinInmail.value = `Hi ${contact}, we make custom-knit socks in the USA. Mind if I send a free digital proof of what this could look like for ${co}?`;
        if (callOpener) callOpener.textContent = `"Hey ${contact}, Travis here. Can I send you a free custom design proof for ${co}?"`;
        if (voicemail) voicemail.value = `Hey ${contact}, Travis here. Just wanted to see if I could send a free custom design proof for ${co}. Reply to my email if you're open to it.`;
    } else if (tone === 'humorous') {
        if (emailSubject) emailSubject.value = `Not another boring pitch for ${co} 🧦`;
        if (emailBody) emailBody.value = `Hi ${contact},\n\nI know you're probably dodging sales pitches like Neo in The Matrix, but hear me out.\n\nWe make custom-knit socks that are so comfortable, your employees might never take them off (we don't recommend this for hygiene reasons, but you get the point).\n\nCan I send over a free digital proof to show you what ${co} would look like on a ridiculously comfy pair of socks?`;
        if (linkedinInmail) linkedinInmail.value = `Hi ${contact}, dodging sales pitches is hard work. Let's make it easy: I make ridiculously comfy custom socks. Can I send a free digital proof for ${co}?`;
        if (callOpener) callOpener.textContent = `"Hey ${contact}, Travis here. I promise this isn't another boring pitch about enterprise synergies..."`;
        if (voicemail) voicemail.value = `Hi ${contact}, Travis here. I'm officially the person cold calling you about socks. But they're really good socks. I'll send an email with a free design proof.`;
    }

    // Automatically run spam auditor and deliverability grade
    if (typeof window.runDeliverabilityAudit === 'function') {
        window.runDeliverabilityAudit();
    }
    if (typeof window.updateMobilePhoneSimulator === 'function') {
        window.updateMobilePhoneSimulator();
    }
    
    // UI Feedback
    document.querySelectorAll('.tone-pills .tone-pill').forEach(p => p.classList.remove('active'));
    event.currentTarget.classList.add('active');

    if (typeof showToast === 'function') {
        showToast('✨ Tone updated to ' + tone.toUpperCase());
    }
}

// Make sure it's globally available
window.applyTone = applyTone;
