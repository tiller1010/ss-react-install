<nav class="primary">
	<span class="nav-open-button">²</span>
	<ul>
		<% loop $Menu(1) %>
			<li class="$LinkingMode">
				<a href="$Link" pagetype="$ClassName" title="$Title.XML">$MenuTitle.XML</a>
				<% if $Children %>
				    <ul class="nav-dropdown">
						<% loop $Children %>
							<li class="$LinkingMode"><a href="$Link" pagetype="$ClassName" title="$Title.XML">$MenuTitle.XML</a></li>
						<% end_loop %>
				    </ul>
				<% end_if %>
			</li>
		<% end_loop %>
	</ul>
</nav>
