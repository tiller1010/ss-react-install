<footer class="footer" role="contentinfo">
	<div class="inner">
		<div class="unit size4of4 lastUnit">
			<div class="left">
				<a href="$BaseHref" class="brand" rel="home">$SiteConfig.Title</a>
				<span class="arrow">&rarr;</span> <% include Navigation %>
			</div>
			<div class="right">
				<% loop $SiteConfig.SocialMediaLinks %>
					<a href="$Link" class="social-link"><i class="fa fa-$Icon"></i><span>$Type</span></a>
				<% end_loop %>
			</div>
		</div>
	</div>
</footer>